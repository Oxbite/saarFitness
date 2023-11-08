const knex = require('knex');
const fs = require('fs').promises;

const databaseFilePath = '../database/db.db';
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: databaseFilePath,
  },
  useNullAsDefault: true,
});

(async () => {
  try {
    const data = await fs.readFile("./oxbite.txt", "utf8");
    console.log(data);

    const filePath = "./last_updated.json";
    const today = new Date().toISOString().split("T")[0];

    try {
      const jsonData = JSON.parse(await fs.readFile(filePath, 'utf8'));

      if (jsonData.date === "") {
        jsonData.date = today;
      }

      const last_date = jsonData.date;

      if (today <= new Date(jsonData.date)) {
        console.log("Already checked for", today, new Date(jsonData.date));
        return;
      }

      const expiredSubscriptions = await db('subscription')
        .select('subscription.id as subscription_id', 'subscription.customer', 'customer.fname as customer_name', 'subscription.end_date')
        .join('customer', 'subscription.customer', 'customer.id')
        .where('subscription.end_date', '<', today)
        .andWhere('subscription.end_date', '>', last_date);

      if (expiredSubscriptions.length > 0) {
        const notifications = expiredSubscriptions.map((subscription) => ({
          read: false,
          link: `account-settings/${subscription.customer}/`,
          message: `${subscription.customer_name}'s subscription ended on ${subscription.end_date}.`,
        }));

        await db('notification').insert(notifications);
        db.destroy();
      }

      jsonData.date = today;
      await fs.writeFile(filePath, JSON.stringify(jsonData));
      console.log("new date writing");
    } catch (error) {
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error reading the file:', error);
  } finally {
    db.destroy();
  }
})();
