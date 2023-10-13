import { db } from 'src/lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const data = req.body

  try {
    await db.transaction(async trx => {
      if (data.customer && data.customer.id) {
        const customerExists = await trx('customer').where('id', data.customer.id).first()

        if (customerExists) {
          if (data.subscription) {
            // Insert new subscriptions for the customer
            await trx('subscription').insert(data.subscription)
          }
        } else {
          console.log('customer not found!')
          res.status(404).json({ message: 'Customer not found' })
        }
      } else {
        console.log('customer id not givem')
        res.status(400).json({ message: 'Customer ID not provided' })
      }
    })
    console.log('added!@')
    res.json({ message: 'Subscriptions added successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
