const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = '7423254471:AAGGQfpP3yKi2xYfbKZNggxtFeFWykqKZ3E';
const bot = new TelegramBot(token, { polling: true });

// Store bot information
let botName = '';
let botUsername = '';

// Fetch bot information and store it
bot.getMe().then((botInfo) => {
  botName = botInfo.first_name;
  botUsername = botInfo.username;

  // Now that we have the bot's information, listen for the "/start" command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;  // Declare chatId here
    bot.sendChatAction(chatId, 'typing');  // Send typing action

    const userName = msg.from.username || "there";  // Fallback if the user doesn't have a username

    const welcomeMessage = `
ʜᴇʟʟᴏ @${userName},
ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ${botName}. ɪ'ᴍ ʜᴇʀᴇ ᴛᴏ ʜᴇʟᴩ yᴏᴜ ꜱʜᴀʀᴇ ꜰɪʟᴇꜱ ꜱᴇᴀᴍʟᴇꜱꜱʟʏ ᴀɴᴅ ꜱᴇᴄᴜʀᴇʟʏ. ʟᴇᴛ'ꜱ ɢᴇᴛ ꜱᴛᴀʀᴛᴇᴅ—ᴊᴜꜱᴛ ꜱᴇɴᴅ yᴏᴜʀ ꜰɪʟᴇꜱ, ᴀɴᴅ ɪ'ʟʟ ᴛᴀᴋᴇ ᴄᴀʀᴇ ᴏꜰ ᴛʜᴇ ʀᴇꜱᴛ!

ᴄᴏᴍᴍᴀɴᴅꜱ
/start - ꜱᴛᴀʀᴛ ᴛʜᴇ ʙᴏᴛ
/view - ᴠɪᴇᴡ ᴀɴ ᴜᴩʟᴏᴀᴅᴇᴅ ꜰɪʟᴇ
/create - ᴀᴅᴅ ᴀ ɴᴇᴡ ꜰɪʟᴇ
/list - ʟɪꜱᴛ yᴏᴜʀ ᴄʀᴇᴀᴛᴇᴅ ꜰɪʟᴇꜱ
/delete - ᴅᴇʟᴇᴛᴇ ᴀ ᴄʀᴇᴀᴛᴇᴅ ꜰɪʟᴇ
/help - ꜰᴏʀ ʜᴇʟᴩ ᴛᴏ ᴜꜱᴇ ᴛʜɪꜱ ʙᴏᴛ
/about - ᴀʙᴏᴜᴛ ᴛʜɪꜱ ʙᴏᴛ
`;

    bot.sendMessage(chatId, welcomeMessage);
  });

  // Listen for the /help command
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;  // Declare chatId here
    bot.sendChatAction(chatId, 'typing');  // Send typing action
    bot.sendMessage(chatId, 'How can I assist you?');
  });

  // Listen for any incoming message
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;  // Declare chatId here
    bot.sendChatAction(chatId, 'typing');  // Send typing action
    
    if (!msg.text) {
      // Convert the message object to a string and send it back
      const messageDetails = JSON.stringify(msg, null, 2); // Pretty print with 2 spaces
      bot.sendMessage(chatId, `Here are the full message details:\n\n${messageDetails}`);
    }
  });

});

// Handle unexpected errors
bot.on('polling_error', (error) => {
  console.error(error.code);  // => 'EFATAL'
});
