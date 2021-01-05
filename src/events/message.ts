import { GuildMember, Message } from 'discord.js'
import config from '../config/application'

// Commands
import interview from '../commands/interview'
import test from '../commands/test'

/**
 * Controller for the on message event
 * @param message Discord.Message
 */
async function controller(message: Message) {
  if (message.content[0] != '!') return
  if (message.author.bot) return

  if (!memberAllowed(message.member)) return

  let args = message.content.split(' ')

  switch(args.shift().replace('!', '')) {
    case 'interview':
    case 'i':      
      interview(message,  args)
      break;
    case 'test':
      if (config.env == 'development') test(message, args)
      break;
  }
}

function memberAllowed(member: GuildMember): boolean {
  const roles = member.roles.cache.array().map(x => x.id)

  for (const allowedRole in config.allowedRoles.split(';')) {
    if (roles.includes(allowedRole)) return true
  }

  return member.hasPermission('ADMINISTRATOR')
}

export default controller
