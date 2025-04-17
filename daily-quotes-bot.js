// daily-quotes-bot.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create a new client instance
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ] 
});

// Load quotes from JSON file
function loadQuotes() {
  try {
    const filePath = path.join(__dirname, 'quotes.json');
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading quotes:', error);
    return {
      quotes: [
        { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
        { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
      ]
    };
  }
}

// Get a random quote from the quotes array
function getRandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Send daily quote
async function sendDailyQuote() {
  try {
    const { quotes } = loadQuotes();
    const quote = getRandomQuote(quotes);
    
    // Channels to send the quote to
    const channelIds = process.env.CHANNEL_IDS.split(',');
    
    for (const channelId of channelIds) {
      const channel = await client.channels.fetch(channelId.trim());
      
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Quote of the Day')
          .setDescription(`"${quote.text}"`)
          .setFooter({ text: `- ${quote.author}` })
          .setTimestamp();
        
        await channel.send({ embeds: [embed] });
        console.log(`Sent daily quote to channel ${channelId}`);
      }
    }
  } catch (error) {
    console.error('Error sending daily quote:', error);
  }
}

// Schedule quote sending - default 9:00 AM
function scheduleQuote() {
  const now = new Date();
  const targetHour = parseInt(process.env.QUOTE_HOUR || 9);
  const targetMinute = parseInt(process.env.QUOTE_MINUTE || 0);
  
  let targetTime = new Date(now);
  targetTime.setHours(targetHour, targetMinute, 0, 0);
  
  // If the target time has already passed today, schedule for tomorrow
  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  
  const timeUntilTarget = targetTime - now;
  
  // Schedule the first quote
  setTimeout(() => {
    sendDailyQuote();
    // Then schedule it to happen every 24 hours
    setInterval(sendDailyQuote, 24 * 60 * 60 * 1000);
  }, timeUntilTarget);
  
  console.log(`Daily quote scheduled for ${targetTime.toLocaleTimeString()}`);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  scheduleQuote();
});

// Login to Discord with your token
client.login(process.env.DISCORD_TOKEN);