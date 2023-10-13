import { db } from 'src/lib/db'
export default async function handler(req, res) {
  if (req.method != 'POST') {
    res.status(405).end()
  }
  const data = req.body
  try {
    console.log(data)
    let insertIds
    if (!data.attendance.id) {
      insertIds = await db('attendance').insert(data.attendance)
    } else {
      await db('attendance').where('id', data.attendance.id).update({
        arrival: data.attendance.arrival,
        departure: data.attendance.departure
      })
    }
    res.json({ data: insertIds })
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
