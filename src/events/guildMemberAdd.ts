import { GuildChannel, GuildMember, PermissionOverwrites } from "discord.js";

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

export default async (member: GuildMember) => {
  const guild = await member.guild

  const channels = guild.channels.cache.filter(x => x.name.includes('interview_'))
  const gategory = guild.channels.cache.find(x => x.name == 'interview')

  let interviewChannel = await guild.channels.create(
    `interview_${findAvailableID(channels.array())}`,
    {
      type: 'text',
      parent: gategory,
      permissionOverwrites: gategory.permissionOverwrites
    }
  )

  // Allow member to see the channel
  interviewChannel.permissionOverwrites.set(member.id, new PermissionOverwrites(interviewChannel, {
    id: member.id,
    type: 'member',
    allow: ['VIEW_CHANNEL']
  }))

  // Save new permissions
  interviewChannel.overwritePermissions(interviewChannel.permissionOverwrites)

  interviewChannel.send(`Hello <@${member.id}>, would you start off by talking about your experience in ikariam`)
}
