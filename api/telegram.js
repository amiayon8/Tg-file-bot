const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
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

// Receive text messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Check if message contains any file
  if (msg.document) {
    bot.sendMessage(chatId, 'Received your document!');
  } else if (msg.photo) {
    bot.sendMessage(chatId, 'Nice photo!');
  } else if (msg.audio) {
    bot.sendMessage(chatId, 'Nice audio!');
  } else {
    bot.sendMessage(chatId, 'I received your message: ' + msg.text);
  }
});

// Get file information
bot.on('document', (msg) => {
  const chatId = msg.chat.id;
  const fileId = msg.document.file_id;

  bot.getFile(fileId).then((fileInfo) => {
    bot.sendMessage(chatId, `File Info: ${JSON.stringify(fileInfo)}`);
  }).catch((error) => {
    bot.sendMessage(chatId, 'Error getting file info.');
  });
});

// Send a message
function sendMessage(chatId, text) {
  bot.sendMessage(chatId, text);
}

// Send a file
function sendFile(chatId, filePath) {
  bot.sendDocument(chatId, filePath);
}

// Send a photo
function sendPhoto(chatId, photoUrl) {
  bot.sendPhoto(chatId, photoUrl);
}

// Send audio
function sendAudio(chatId, audioUrl) {
  bot.sendAudio(chatId, audioUrl);
}

// Handle unexpected errors
bot.on('polling_error', (error) => {
  console.error(error.code);  // => 'EFATAL'
});
