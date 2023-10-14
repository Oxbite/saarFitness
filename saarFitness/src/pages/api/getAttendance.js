import { db } from 'src/lib/db'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { date } = req.query

  const tomorrow = new Date(date)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const attendances = await db('attendance')
    .select('attendance.*', 'customer.fname') // Select the columns you need
    .join('customer', 'attendance.customer', 'customer.id') // Join attendance with customers
    .where('arrival', '>=', date)
    .andWhere('arrival', '<=', tomorrow.toISOString().split('T')[0])
  console.log(attendances)
  res.json(attendances)
}
