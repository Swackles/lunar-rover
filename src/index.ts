import controller from "./util/controller";

const Discord = require('discord.js');
const client = new Discord.Client();

const serverID = 
const channelID = 
const token = 

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let channel = await client.channels.fetch(channelID)

  let messages = await channel.messages.fetch()
  
  messages.each(msg => {
    console.log(msg.content)
  })
});

client.on('message', controller);


client.login(token);