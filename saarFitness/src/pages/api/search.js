import { db } from 'src/lib/db'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const { name } = req.query
  try {
    // Use Knex to query the database
    const results = await db('customer').where('fname', 'like', `%${name}%`).select('id', 'fname', 'email', 'phone')

    res.status(200).json(results)
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
