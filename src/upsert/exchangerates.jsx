const cron = require('node-cron');


cron.schedule('0 0 * * *', () => {
  console.log('Posting data at midnight...');
  // Implement your data posting logic here
});

// Schedule for 12 PM (noon)
cron.schedule('0 12 * * *', () => {
  console.log('Posting data at noon...');
  // Implement your data posting logic here
});