import { db } from 'src/lib/db'
export default function handler(req, res) {
  const data = db('costumers')
  console.log(data)
  res.status(200).json({ name: 'John Doe' })
}
