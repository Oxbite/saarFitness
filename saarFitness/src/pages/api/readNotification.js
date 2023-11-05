import { db } from 'src/lib/db'
export default async function handler(req, res) {
  const { ids } = req.body;
  try {
    // Update notifications to mark them as read
    await db('notification')
      .whereIn('id', ids)
      .update({ read: true });
    res.status(200).json({ message: 'Notifications marked as read.' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
