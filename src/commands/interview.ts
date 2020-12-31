import { Message, TextChannel } from 'discord.js'

const rolesToGive = ['member', 'new moon']

/**
 * interview controller
 * @param message Discord.Message class
 * @param args arguments of the command
 */
async function main(message: Message, args: string[]) {
  if (!(message.channel instanceof TextChannel)) return
  if (!message.channel.name.includes('interview_')) return

  console.log(message.channel.permissionOverwrites);  

  const memberID = message.channel.permissionOverwrites.find(x => x.type == 'member').id

  await message.channel.delete()

  if (args[0] != 'accept' && args[0] != 'a') return
  
  const rolesToAdd = message.guild.roles.cache.filter(role =>
    rolesToGive.includes(role.name.toLowerCase())
  )

  const member = await message.guild.members.fetch(memberID)
  member.roles.add(rolesToAdd)
}

export default main
