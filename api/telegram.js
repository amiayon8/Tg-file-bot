const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = '7423254471:AAGGQfpP3yKi2xYfbKZNggxtFeFWykqKZ3E';
const bot = new TelegramBot(token, { polling: true });

// Listen for "/start" command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! I am your bot.');
});

// Listen for commands (e.g., /help)
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'How can I assist you?');
});

// Listen for any incoming message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 if(!msg.text){
  // Convert the message object to a string and send it back
  const messageDetails = JSON.stringify(msg, null, 2); // Pretty print with 2 spaces
  bot.sendMessage(chatId, `Here are the full message details:\n\n${messageDetails}`);
 }
 
 });

// Handle unexpected errors
bot.on('polling_error', (error) => {
  console.error(error.code);  // => 'EFATAL'
});
