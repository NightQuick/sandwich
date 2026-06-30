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
    status: "pending",
    totalPrice:0
  };
  const test:[boolean, number]= await checkProducts(order.items);
  console.log(order)
  if (test[0]==false){
    const result=false
  res.status(400).json({})
  }else{
    order.totalPrice=test[1]
    const result = await db.collection("orders").insertOne(order);
  res.status(201).json({ insertedId: result.insertedId });
}
  
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

async function checkProducts(
  items: {
    name: string;
    price: number;
    value: number;
    components?: {
      size: string;
      bread: string;
      vegetable: string[];
      sauce: string[];
      filling: string[];
    };
  }[]
): Promise<[boolean, number]> {
  const db = getDB();
  let totalPrice = 0;

  for (const product of items) {
    let priceOfProd = 0;

    const prod = await db.collection('products').findOne({ name: product.name });
    if (!prod) return [false, 0];
    priceOfProd += prod.price;

    if (product.components) {
      const { size, bread, vegetable, sauce, filling } = product.components;

      for (const key of [size, bread]) {
        const type = key === size ? 'size' : 'bread';
        const res = await db.collection('ingredients').findOne({ type, key });
        if (!res) return [false, 0];
        priceOfProd += res.price;
      }

      for (const [type, list] of [
        ['vegetable', vegetable],
        ['sauce', sauce],
        ['filling', filling],
      ] as const) {
        for (const key of list) {
          const res = await db.collection('ingredients').findOne({ type, key });
          if (!res) return [false, 0];
          priceOfProd += res.price;
        }
      }
    }

    if (priceOfProd !== product.price) return [false, 0];
    totalPrice += priceOfProd;
  }

  return [true, totalPrice];
}
