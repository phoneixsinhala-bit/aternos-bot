const express = require('express');
const app = express();
const mineflayer = require('mineflayer');

app.get('/', (req, res) => res.send('Bot Status: Active'));
app.listen(process.env.PORT || 3000, () => console.log('Server is running'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Japanese_vilage.aternos.me',
    port: 20604,
    username: 'AFK_Bot_247',
    auth: 'offline',
    version: '1.20.6'
  });

  bot.on('spawn', () => {
    console.log('Bot successfully connected to Japanese Village!');
  });

  bot.on('kicked', console.log);
  bot.on('error', console.log);

  bot.on('end', () => {
    console.log('Bot disconnected. Retrying in 15 seconds...');
    setTimeout(createBot, 15000);
  });
}

createBot();
