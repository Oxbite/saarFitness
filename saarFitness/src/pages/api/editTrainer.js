import { db } from 'src/lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const data = req.body

  try {
    // Start a database transaction
    console.log(data.trainer)
    if (data.trainer && data.trainer.id) {
      // Update the customer with the provided ID
      await db('trainer').where('id', data.trainer.id).update({
        start_date: data.trainer.start_date,
        end_date: data.trainer.end_date,
        period: data.trainer.period,
        price: data.trainer.price,
        paid: data.trainer.paid,
        trainer: data.trainer.trainer
      })
    }
    res.json({ message: 'Data updated successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
