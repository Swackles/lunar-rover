import { expect } from "chai";
import { describe, it } from 'mocha'

import rewire = require("rewire");
import Participant from "../../../src/util/Ikariam/participant";
import parseInformation from "./../../../src/util/battleParser/parseInformation"

const battleReport = rewire("./../../../src/util/battleParser/parseInformation")
const parseParticipant = battleReport.__get__('parseParticipant')

describe('parseInformation', () => {
  it('when land war, should return object containing data', () => {
    const input = `Battle for Novigrad (27.09.2020 18:39:58) Azazel[LURK] from K-1 vs MonchoG from Novigrad`
    let result = parseInformation(input)
    let date = new Date('2020-09-27T18:39:58').toString()
    
    expect(result.type).eq('LAND')
    expect(result.city).eq('Novigrad')
    expect(result.dateTime.toString()).eq(date)
  })

  it('when sea war, should return object containing data', () => {
    const input = `Sea battle near WAKE UP (26.09.2020 20:01:44) Xorah[SPQR] from Medellín vs Kyrori[LURK] from Nothing Here, Swackles[LURK] from Lust`
    let result = parseInformation(input)
    let date = new Date('2020-09-26T20:01:44').toString()

    expect(result.type).eq('SEA')
    expect(result.city).eq('WAKE UP')
    expect(result.dateTime.toString()).eq(date)
  })
})

describe('parseParticipant', () => {
  it('when dosen\'t have alliance, should return Participant without alliance', () => {
    let result = parseParticipant('DeathWarrant from ʄʀɛɛʐɛ ƈօʀʟɛօռɛ')
    let eq = new Participant('DeathWarrant', null, 'ʄʀɛɛʐɛ ƈօʀʟɛօռɛ')

    expect(result.name).equal(eq.name)
    expect(result.alliance).equal(eq.alliance)
    expect(result.town).equal(eq.town)
  })

  it('when does have an alliance, should return Participant with alliance', () => {
    let result = parseParticipant('Xorah[SPQR] from Medellín')
    let eq = new Participant('Xorah', 'SPQR', 'Medellín')
    
    expect(result.name).equal(eq.name)
    expect(result.alliance).equal(eq.alliance)
    expect(result.town).equal(eq.town)
  })
})