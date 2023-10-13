import { db } from 'src/lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const data = req.body

  try {
    // Start a database transaction
    await db.transaction(async trx => {
      if (data.customer && data.customer.id) {
        // Update the customer with the provided ID
        await trx('customer').where('id', data.customer.id).update(data.customer)
      }

      if (data.conditions) {
        if (data.customer && data.customer.id) {
          // Delete previous conditions for the customer
          await trx('conditions').where('customer', data.customer.id).del()
        }

        if (data.conditions.length > 0) {
          // Insert new conditions
          data.conditions.map(e => {
            e.customer = data.customer.id
          })
          await trx('conditions').insert(data.conditions)
        }
      }
    })

    res.json({ message: 'Data updated successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
