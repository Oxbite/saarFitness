import { db as knex } from 'src/lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
    try {
      const customerCount = await knex('customer').count('* as count').first();
      const staffCount = await knex('staff').count('* as count').first();
      const yearlyAmount = await knex('subscription').sum('price as amount').where('paid', true).andWhere('period','=', 12).first();
      const monthlyAmount =await knex('subscription').sum('price as amount').where('paid', true).andWhere('period','=', 1).first();
      const quarterlyAmount =await knex('subscription').sum('price as amount').where('paid', true).andWhere('period','=', 3).first();
      const unpaidSubscriptions = await knex('subscription').count('* as amount').where('paid', false).first();
      const unpaidAmount = await knex('subscription').sum('price as amount').where('paid', false).first();
      res.status(200).json({
        customerCount: customerCount.count,
        staffCount: staffCount.count,
        yearly: yearlyAmount.amount || 0,
        monthly: monthlyAmount.amount || 0,
        quarterly: quarterlyAmount.amount || 0,
        unpaidCount: unpaidSubscriptions.amount || 0,
        unpaidAmount: unpaidAmount.amount || 0,
      });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
