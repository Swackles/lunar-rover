import { DMChannel, MessageEmbed, NewsChannel, TextChannel } from 'discord.js'

async function main(channel: TextChannel | DMChannel | NewsChannel, msg: string) {
  const embedMessage = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(':exclamation: ERROR :exclamation:')
    .setDescription(msg)
  
  channel.send(embedMessage)
}

export default main