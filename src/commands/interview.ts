import { Guild, Message, TextChannel } from 'discord.js'
import config from '../config/application'

/**
 * interview controller
 * @param message Discord.Message class
 * @param args arguments of the command
 */
async function main(message: Message, args: string[]) {
  if (!(message.channel instanceof TextChannel)) return
  if (!message.channel.name.includes('interview_')) return

  const memberId = message.channel.permissionOverwrites.find(x => x.type == 'member').id

  await message.channel.delete()

  if (args[0] == 'accept' || args[0] == 'a') accept(memberId, message.guild)
}

async function accept(id: string, guild: Guild) {
  const member = guild.members.cache.get(id)

  const rolesToAdd = guild.roles.cache.filter(x => config.roles.newMember.split(';').includes(x.id))

  member.roles.add(rolesToAdd)
}

export default main
