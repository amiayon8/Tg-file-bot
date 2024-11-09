const TelegramBot = require('node-telegram-bot-api');

export default {
  async fetch(request, env) {
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(botToken);

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

      // Handle `/send` command
      if (text.startsWith('/send ')) {
        const msg = text.slice(6); // Extract message after `/send`
        await bot.sendMessage(chatId, `You sent: ${msg}`);
      }
    }

    return new Response('ok', { status: 200 });
  },
};
