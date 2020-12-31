import { Message } from "discord.js";
import guildMemberAdd from "../events/guildMemberAdd";

async function main(message: Message, args: string[]) {
  switch (args.shift()) {
    case 'event':
      event(message, args)
      break;
  }
}

async function event(message: Message, args: string[]) {
  switch(args.shift()) {
    case 'guildMemberAdd':
      guildMemberAdd(message.mentions.members.array()[0])
  }
}

export default main
