import { db } from 'src/lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const data = req.body

  try {
    // Start a database transaction
    console.log(data.subscription)
    if (data.subscription && data.subscription.id) {
      // Update the customer with the provided ID
      await db('subscription').where('id', data.subscription.id).update({
        start_date: data.subscription.start_date,
        end_date: data.subscription.end_date,
        period: data.subscription.period,
        price: data.subscription.price,
        paid: data.subscription.paid
      })
    }
    res.json({ message: 'Data updated successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
