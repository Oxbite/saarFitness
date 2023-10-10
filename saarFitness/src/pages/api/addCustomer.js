import { db } from 'src/lib/db'
export default async function handler(req, res) {
  if (req.method != 'POST') {
    res.status(405).end()
  }
  const data = req.body
  try {
    const insertIds = await db('costumers').insert(data.costumer)
    const enddate = new Date()
    enddate.setMonth(enddate.getMonth() + data.subscription.period)
    await db('subscriptions').insert({
      customer_id: insertIds[0],
      type: 'admission',
      date: data.subscription.Sdate,
      paid: data.subscription.paid,
      renewal_rate: data.subscription.renewal_rate,
      end_date: enddate,
      period: data.subscription.period
    })
    db.destroy()
    res.json({ data: insertIds })
  } catch (e) {
    res.status(500).end()
  }
}
