# 1st-Discord-Bot
A simple Discord bot that sends daily inspirational quotes to your server channels. 

# Daily Quotes Discord Bot

A simple Discord bot that sends daily inspirational quotes to your server channels.

## Features

- Automatically sends a random inspirational quote at a scheduled time each day
- Customizable quote delivery time
- Beautiful embedded message format
- Easy to add your own quotes collection
- Multiple channel support - send quotes to multiple channels simultaneously

## Preview

When running, the bot sends a daily quote that looks like this:

```
Quote of the Day
---------------
"The best time to plant a tree was 20 years ago. The second best time is now."

- Chinese Proverb
[Timestamp]
```

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- A Discord account and server where you have admin permissions
- Basic knowledge of using command line/terminal

### Installation

1. Clone this repository or download the files:
   ```bash
   git clone https://github.com/yourusername/daily-quotes-discord-bot.git
   cd daily-quotes-discord-bot
   ```

2. Install the required dependencies:
   ```bash
   npm install discord.js dotenv
   ```

3. Create a `.env` file in the project root and add your configuration:
   ```
   # Discord Bot Token
   DISCORD_TOKEN=your_discord_bot_token_here

   # Channel IDs to send quotes to (comma-separated)
   CHANNEL_IDS=channel_id_1,channel_id_2

   # Time to send daily quotes (24-hour format)
   QUOTE_HOUR=9
   QUOTE_MINUTE=0
   ```

### Creating a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" tab and click "Add Bot"
4. Under the token section, click "Reset Token" and copy it (this goes in your `.env` file)
5. Enable necessary intents (Server Members Intent, Message Content Intent)
6. Go to OAuth2 > URL Generator
7. Select scopes: `bot` and `applications.commands`
8. Select permissions: `Send Messages`, `Embed Links`, `Read Message History`
9. Use the generated URL to invite the bot to your server

### Running the Bot

Start the bot with:
```bash
node daily-quotes-bot.js
```

The bot will automatically schedule the quote delivery based on your `.env` configuration.

## Customization

### Adding Your Own Quotes

Edit the `quotes.json` file to add your own collection of quotes:

```json
{
  "quotes": [
    {
      "text": "Your quote text here",
      "author": "Author Name"
    },
    {
      "text": "Another quote",
      "author": "Another Author"
    }
  ]
}
```

### Changing Quote Delivery Time

Modify the `QUOTE_HOUR` and `QUOTE_MINUTE` values in your `.env` file to change when quotes are delivered. Uses 24-hour format.

## Acknowledgments

- Thank you to the Discord.js team for their excellent library
- Quote content sourced from various public domain collections

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
