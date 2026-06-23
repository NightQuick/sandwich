import { MongoClient, Db } from "mongodb";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/myAppDB";

let db: Db;

export async function connectDB(): Promise<Db> {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  db = client.db(); // имя базы уже указано в MONGO_URL
  console.log("MongoDB connected");
  return db;
}

export function getDB(): Db {
  if (!db) throw new Error("DB not initialized. Call connectDB() first.");
  return db;
}