import { db } from 'src/lib/db'
export default async function handler(req, res) {
  const resd = await db('subscriptions')
    .select('subscriptions.*', 'customers.fname as customer_name', 'customers.id as customer_id')
    .join('customers', 'subscriptions.customer_id', 'customers.id')
    .where('subscriptions.end_date', '>', new Date())
    .orderBy('subscriptions.end_date', 'asc')

  db.destroy()
  res.json({ data: resd })
}
