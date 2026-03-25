let orders = [];
let nextOrderId = 1;

export const createOrder = (req, res) => {
  let items = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: `Order can't be empty` });
  }
  const total = items.reduce((sum, item) => sum + item.price * item.value, 0);
  items = JSON.stringify(items);
  const newOrder = {
    id: nextOrderId++,
    items,
    total,
    status: 'pending',
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
  console.log(`Orders Updated: `, orders);
};
