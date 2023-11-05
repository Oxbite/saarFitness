import { knex } from '../../path-to-your-knex-instance';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    const readNotifications = await knex('notification')
      .select('*');

    res.status(200).json(readNotifications);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

