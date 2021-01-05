import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import config from "../config/application";

async function main(member: GuildMember) {
  const embed = new MessageEmbed()
    .setColor(member.displayHexColor)
    .setTitle('Member left')
    .setDescription(`<@${member.id}> has left the server`)
    .setThumbnail(member.user.displayAvatarURL());

  (<TextChannel>member.guild.channels.cache.get(config.channel.log)).send(embed)
}

export default main
