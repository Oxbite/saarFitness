import { db } from "src/lib/db";

export default async function handler(req, res) {
  if(req.method != "POST") {
      res.status(400).end();
  }
  const { tablename } = req.query
  const {id }  = req.body
  try {
    if (tablename == "customer")
    {
      await db("subscription").where("customer", id).delete();
    }
    await db(tablename).where("id", id).del()
    res.status(200).end()
  } catch (error) {
    console.error('Error retrieving customer information:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
