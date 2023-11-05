import { db } from 'src/lib/db'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }
  try {
    const readNotifications = await db('notification')
      .where({ read: false })
      .select('*');
    res.status(200).json(readNotifications);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

