import { db } from 'src/lib/db'
export default async function handler(req, res) {
  if (req.method != 'POST') {
    res.status(405).end()
  }
  const data = req.body
  try {
    console.log(data)
    const insertIds = await db('customer').insert(data.customer)
    data.conditions.map(e => {
      e.customer = insertIds[0]
    })
    if (data.conditions.length > 0) {
      await db('conditions').insert(data.conditions)
    }
    res.json({ data: insertIds })
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
