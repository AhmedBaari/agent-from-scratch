import { JSONFilePreset } from "lowdb/node";
import type { AIMessage } from "../types";
import { v4 as uuidv4 } from "uuid";

export type MessageWithMetadata = AIMessage & {
    id: string;
    createdAt: string;
};

export const addMetaData = (message: AIMessage): MessageWithMetadata => {
    return {
        ...message,
        id: uuidv4(),
        createdAt: new Date().toISOString()
    };
};

export const removeMetaData = (message: MessageWithMetadata): AIMessage => {
    const { id, createdAt, ...rest } = message;
    return rest;
};

type Data = {
    messages: MessageWithMetadata[];
}

const defaultData: Data = {
    messages: []
};

export const getDB = async () => {
    const db = await JSONFilePreset<Data>("db.json", defaultData);
    return db;
};

export const addMessages = async (messages: AIMessage[]) => {
    const db = await getDB();
    db.data.messages.push(...messages.map(addMetaData));
    await db.write();
}

export const getMessages = async () => {
    const db = await getDB();
    return db.data.messages.map(removeMetaData);
}