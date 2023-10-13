import { db } from 'src/lib/db'
export default async function handler(req, res) {
  if (req.method != 'POST') {
    res.status(405).end()
  }
  const data = req.body
  try {
    console.log(data)
    const insertIds = await db('staff').insert(data.staff)
    res.json({ data: insertIds })
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
