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
    version: '1.20.6'
  });

  bot.on('spawn', () => console.log('Bot successfully connected to Japanese Village!'));

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log(err));
}

createBot();
