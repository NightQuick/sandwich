import { Request, Response } from 'express';

interface OrderItem {
  price: number;
  value: number;
  [key: string]: unknown;
}

interface Order {
  id: number;
  items: string;
  total: number;
  createdAt: Date;
}

let orders: Order[] = [];
let nextOrderId = 1;

export const createOrder = (req: Request, res: Response) => {
  let items: OrderItem[] = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: `Order can't be empty` });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.value, 0);
  const newOrder: Order = {
    id: nextOrderId++,
    items: JSON.stringify(items),
    total,
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
  console.log(`Orders Updated: `, orders);
};
