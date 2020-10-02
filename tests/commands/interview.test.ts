import { expect } from "chai";
import { Client, Collection, Guild, GuildChannel, Message, TextChannel } from 'discord.js'
import rewire  = require("rewire");
import interview from "./../../src/commands/interview";

const interviewRewire = rewire("./../../src/commands/interview")
const findAvailableID = interviewRewire.__get__('findAvailableID')
const guild = new Guild(new Client(), {})

describe('findAvailableID', () => {
  describe('findsFirstAvailableID', () => {
    it('should return 0', () => {
      const input = [
        new GuildChannel(guild, { name: 'interview_1'})
      ]

      const result = findAvailableID(input)
      expect(result).to.eq(0)
    })

    it('should retun 3', () => {
      const input = [
        new GuildChannel(guild, { name: 'interview_4'}),
        new GuildChannel(guild, { name: 'interview_8'}),
        new GuildChannel(guild, { name: 'interview_1'}),
        new GuildChannel(guild, { name: 'interview_0'}),
        new GuildChannel(guild, { name: 'interview_7'}),
        new GuildChannel(guild, { name: 'interview_2'})
      ]

      const result = findAvailableID(input)
      expect(result).to.eq(3)
    })
  })
})