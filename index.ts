import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages, getMessages } from './src/memory'
const userMessage = process.argv.slice(2).join(' ')
console.log('User Message:', userMessage)

await addMessages([{ role: 'user', content: userMessage }])

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const messages = await getMessages()
const response = await runLLM({
  messages,
})

await addMessages([{ role: 'assistant', content: response }])

console.log('LLM Response:', response)
