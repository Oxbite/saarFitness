import { db } from 'src/lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }
  const data = req.body
  try {
    await db.transaction(async trx => {
      if (data.staff && data.staff.id) {
        await trx('staff').where('id', data.staff.id).update(data.staff)
      }
    })
    res.json({ message: 'Data updated successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
