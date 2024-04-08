require('dotenv').config()
const { Client, IntentsBitField } = require("discord.js");

// IntentsBitField -> kya kya bot kar sakta hai
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds, // allows bot to receive information about servers on Discord
    IntentsBitField.Flags.GuildMembers, // allows bot to receive information about users in the server
    IntentsBitField.Flags.GuildMessages, // allows bot to receive messages sent in guild channels
    IntentsBitField.Flags.MessageContent, // allows bot to read the actual messages
  ],
});
// This event listener prints when server is running
client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("messageCreate", (message) => {
  // console.log(message);
  if(message.author.bot) return; // bot ke message ka bot reply karne lagega to infinite loop ban sakta hai
  if ((message.content).toLowerCase() === "hello") {
    message.reply('Hello');   
  }
});

//----------- Slash commands -------------------------
client.on("interactionCreate", async (interaction) =>{
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName==='hey'){
    await interaction.reply('Hey!');
  }
  if(interaction.commandName==='ping'){
    await interaction.reply('pong!');
  }
  if(interaction.commandName==='add'){
    const num1 = interaction.options.get('first-number').value;
    const num2 = interaction.options.get('second-number').value;
    await interaction.reply(`The sum is ${num1+num2}`);
  }
});

client.login(
  process.env.TOKEN
);
