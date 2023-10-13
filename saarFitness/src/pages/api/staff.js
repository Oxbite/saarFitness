import { db } from 'src/lib/db'
export default async function handler(req, res) {
  // const resd = await db('subscriptions')
  //   .select('*')
  //   .where('end_date', '>' + new Date())
  //   .orderBy('end_date', 'asc')
  const resd = await db('staff')
  db.destroy()
  res.json({ data: resd })
}
