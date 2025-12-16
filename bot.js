require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const SITE = process.env.WEBSITE_URL;

// ✅ START MESSAGE
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`👋 Welcome to *ZTERA Bot* 🎬

Paste any *TeraBox video link* here 👇  
I'll open it directly in *Chrome browser* with HD player.

⚡ Fast  
🚫 No ads  
📱 Mobile Friendly`,
    { parse_mode: "Markdown" }
  );
});

// ✅ HANDLE LINKS
bot.on("message", (msg) => {
  if (!msg.text) return;

  const text = msg.text.trim();

  // TeraBox link check
  if (text.includes("terabox") || text.includes("1024tera")) {

    const redirectUrl =
      `${SITE}/?url=` + encodeURIComponent(text);

    bot.sendMessage(
      msg.chat.id,
      "▶️ *Open Video in Browser*",
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[
            {
              text: "🔗 Watch on ZTERA",
              url: redirectUrl
            }
          ]]
        }
      }
    );
  }
});
