export default async function handler(req, res) {
  const { id } = req.query
  try {
    const customerInfo = await db('customers').where('id', id).first()
    if (!customerInfo) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    const subscriptionInfo = await db('subscriptions')
      .select('id', 'end_date', 'paid', 'renewal_rate', 'date')
      .where('customer_id', id)
      .orderBy('date', 'asc')
      .first()
    const totalMonths = await db('subscriptions').where('customer_id', id).sum('period as count').first()
    res.status(200).json({
      customer: customerInfo,
      subscription: subscriptionInfo,
      total_months: totalMonths.count
    })
  } catch (error) {
    console.error('Error retrieving customer information:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
