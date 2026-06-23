import { Request, Response } from "express";
import { getDB } from "../db.js";
import { ObjectId } from "mongodb";


export async function getOrders(req: Request, res: Response) {
  const db = getDB();
  const orders = await db.collection("orders").find().toArray();
  res.json(orders);
}

export async function getOrderById(req: Request, res: Response) {
  const db = getDB();
  const id = req.params.id as string;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id format" });
  }

  const order = await db.collection("orders").findOne({ _id: new ObjectId(id) });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
}

export async function createOrder(req: Request, res: Response) {
  const db = getDB();
  const order = {
    items: req.body,
    createdAt: new Date(),
    status: "pending"
  };
  const result = await db.collection("orders").insertOne(order);
  res.status(201).json({ insertedId: result.insertedId });
}

//need for update status of orders
export async function updateOrder(req: Request, res: Response) {
  const db = getDB();
  const id = req.params.id as string;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id format" });
  }

  const result = await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  res.json({ modifiedCount: result.modifiedCount });
}

export async function deleteOrder(req: Request, res: Response) {
  const db = getDB();
  const id = req.params.id as string;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id format" });
  }

  const result = await db.collection("orders").deleteOne({ _id: new ObjectId(id) });
  res.json({ deletedCount: result.deletedCount });
}