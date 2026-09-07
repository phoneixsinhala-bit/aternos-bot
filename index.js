const express = require('express');
const app = express();
const mineflayer = require('mineflayer');

app.get('/', (req, res) => res.send('Bot Status: Active'));
app.listen(process.env.PORT || 3000, () => console.log('Server is running'));

function createBot() {
  // Aternos Bot Prevention Bypass Setup
  setTimeout(() => {
    const bot = mineflayer.createBot({
      host: 'leech.aternos.host',
      port: 20604,
      username: 'AFK_Bot_247',
      auth: 'offline',
      version: false, // Automatically negotiate version with server
      checkTimeoutInterval: 60000
    });

    bot.on('spawn', () => {
      console.log('Bot successfully connected to Japanese Village!');
      // Move slightly to prevent AFK kick
      setInterval(() => {
        if (bot && bot.entity) {
          bot.setControlState('jump', true);
          setTimeout(() => bot.setControlState('jump', false), 500);
        }
      }, 30000);
    });

    bot.on('kicked', (reason) => console.log('Kicked reason:', reason));
    bot.on('error', (err) => console.log('Bot error:', err));

    bot.on('end', () => {
      console.log('Bot disconnected. Retrying in 20 seconds...');
      setTimeout(createBot, 20000);
    });
  }, 5000);
}

createBot();
