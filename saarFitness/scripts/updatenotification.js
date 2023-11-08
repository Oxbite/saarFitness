const knex = require('knex')
const fs = require('fs')

const databaseFilePath = '../database/db.db'
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: databaseFilePath
  },
  useNullAsDefault: true
})

fs.readFile("./oxbite.txt","utf8", (err, data) => {
    console.log(data);
})

const filePath = "./last_updated.json"
const today = new Date().toISOString().split("T")[0]; // Convert today's date to ISO format
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  let jsonData = JSON.parse(data);
  if (jsonData.date == "") {
    jsonData.date == today
  }
  const last_date = jsonData.date;
  if (today <= new Date(jsonData)){
    console.log("Already checked for ", today, new Date(jsonData))
    return;
  }
  db('subscription')
    .select('subscription.id as subscription_id', 'subscription.customer', 'customer.fname as customer_name', 'subscription.end_date')
    .join('customer', 'subscription.customer', 'customer.id')
    .where('subscription.end_date', '<', today).andWhere('subscription.end_date', '>', last_date)
    .then(async (expiredSubscriptions) => {
      // Check if there are any expired subscriptions
      if (expiredSubscriptions.length > 0) {
        // Create notifications for each expired subscription
        const notifications = expiredSubscriptions.map((subscription) => ({
          read: false,
          link: `account-settings/${subscription.customer}/`,
          message: `${subscription.customer_name}s subscription ended on ${subscription.end_date}.`,
        }));
        await db('notification')
          .insert(notifications)
        db.destroy()
        return;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
  });
  jsonData.date = today
  fs.writeFile(filePath, JSON.stringify(jsonData), ()=> {
    console.log("new date writing")
    return;
  })
});
