import { Collection, GuildChannel, GuildMember, Message, RoleManager, TextChannel } from 'discord.js'
import error from '../error' 

/**
 * interview controller
 * @param message Discord.Message class
 * @param args arguments of the command
 */
async function main(message: Message, args: string[]) {
  let members = await message.mentions.members
  // Gurards that mention wasn't for everyone and there aren't multiple people mentioned
  if (message.mentions.everyone || members.array().length != 1) return error(message.channel, 'You need to mention one user')

  const member = members.array()[0]

  // if member has a role then skip
  if (member.roles.cache.array().length != 1) return error(message.channel, 'You can\' interview this person')

  switch(args.shift()) {
    case 'start':
    case 's':
      await startInterview(message, member, args)
      break;
    case 'end':
    case 'e':
      await endInterview(message, member, args)
      break;
  }

  message.delete()
}

/**
 * This starts the interview by creating channel, role and assaigning role to user
 * @param message Discord.Message class
 * @param args arguments of the command
 */
async function startInterview(message: Message, member: GuildMember, args: string[]) {
  const guild = await member.guild
  
  const roles = await guild.roles.fetch()
  const channels = guild.channels.cache.filter(x => x.name.includes('interview_'))
  const gategory = guild.channels.cache.find(x => x.name == 'interview')

  if (hasInterview(channels.array(), member)) return error(message.channel, 'User is already in an interview')

  const id = findAvailableID(channels.array())
  
  guild.channels.create(
    `interview_${id}`,
    {
      type: 'text',
      parent: gategory,
      permissionOverwrites: [
        {
          id: member.id,
          allow: [
            'READ_MESSAGE_HISTORY',
            'VIEW_CHANNEL',
            'SEND_MESSAGES'
          ]
        },
        {
          id: guild.roles.everyone.id,
          deny: 'VIEW_CHANNEL'
        }
      ]
    }
  )
}

/**
 * Checks if user already is in an interview
 * @param channels the array of channels where user can be in
 * @param member member to check if he's in an interview
 */
function hasInterview(channels: GuildChannel[], member: GuildMember): boolean {
  let hasInterview = false

  for (let channel of channels) {
    if (hasInterview) break
    for(let memberInChannel of channel.members.array()) {
      if (memberInChannel.id == member.id) {
        hasInterview = true
        break
      }
    }
  }

  return hasInterview
}

/**
 * Finds the first available id for interview
 * @param channels array of channels to go trough
 */
function findAvailableID(channels: GuildChannel[]): number {
  const regex = /interview_(\d+)/
  const ids = channels.map(x => parseInt(x.name.match(regex)[1]))
  let i: number

  for (i = 0; i < 128; i++) {
    if (!ids.includes(i)) break;
  }

  return i
}

/**
 * Ends the interview by deleting the channel
 * @param message
 * @param args
 */
async function endInterview(message: Message, member: GuildMember, args: string[]) {
  if (!(message.channel instanceof TextChannel)) return
  if (!message.channel.name.includes('interview_')) return

  await message.channel.delete()

  const rolesToAdd = message.guild.roles.cache.array().filter(role =>
    role.name.toLowerCase() == 'member' || role.name.toLowerCase() == 'new moon'
  )

  if (args[0] == 'accept' || args[0] == 'a') {
    await member.roles.add(rolesToAdd)
  }
}

export default main