const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const botToken = '7423254471:AAGGQfpP3yKi2xYfbKZNggxtFeFWykqKZ3E';
const bot = new TelegramBot(botToken);

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

// Handle incoming updates from Telegram
async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Only POST requests are accepted', { status: 405 });
  }

  const update = await request.json();

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Respond to `/start` command
    if (text === '/start') {
      await bot.sendMessage(chatId, 'Welcome to the Cloudflare Telegram Bot!');
    }

    // Respond to `/fileinfo` command
    if (text === '/fileinfo' && update.message.document) {
      const fileId = update.message.document.file_id;
      const fileInfo = await bot.getFile(fileId);
      await bot.sendMessage(chatId, `File Info:\nFile ID: ${fileId}\nFile Path: ${fileInfo.file_path}`);
    }

    // Respond to `/photo` command by sending a photo
    if (text === '/photo') {
      await bot.sendPhoto(chatId, 'https://example.com/photo.jpg', { caption: 'Here is a sample photo' });
    }

    // Respond to `/audio` command by sending an audio file
    if (text === '/audio') {
      await bot.sendAudio(chatId, 'https://example.com/audio.mp3', { caption: 'Here is a sample audio' });
    }

    // Respond to `/send` command to send a message
    if (text.startsWith('/send ')) {
      const msg = text.replace('/send ', '');
      await bot.sendMessage(chatId, `You sent: ${msg}`);
    }
  }

  return new Response('ok', { status: 200 });
}
