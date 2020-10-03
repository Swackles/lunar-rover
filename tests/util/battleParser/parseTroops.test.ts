import { expect } from "chai";
import { describe, it } from 'mocha'

import rewire = require("rewire");
import parseTroops from "../../../src/util/battleParser/parseTroops";


const parseLineRewire = rewire("./../../../src/util/battleParser/parseTroops")
const parseLine = parseLineRewire.__get__('parseLine')

describe('parseTroops', () => {
  it('shoudl return attackers and defenders', () => {
    const input = `............................................. - Archer.................................0(-10)
Hoplite...............................423(-6) - Hoplite................................0(-52)
Battering Ram..........................12(-0) - Battering Ram...........................0(-1)
............................................. - Wall....................................0(-5)
Swordsman..............................90(-0) - .............................................`
    const result = parseTroops(input)

    // Check attackers
    expect(result.attacking).to.be.an('array').and.to.have.lengthOf(3)
    expect(result.attacking).to.deep.include(
      { name: 'Hoplite', total: 429, killed: 6 }
    )
    expect(result.attacking).to.deep.include(
      { name: 'Battering Ram', total: 12, killed: 0 }
    )
    expect(result.attacking).to.deep.include(
      { name: 'Swordsman', total: 90, killed: 0 }
    )
    // Check defenders
    expect(result.defending).to.be.an('array').and.to.have.lengthOf(4)
    expect(result.defending).to.deep.include(
      { name: 'Archer', total: 10, killed: 10 }
    )
    expect(result.defending).to.deep.include(
      { name: 'Hoplite', total: 52, killed: 52 }
    )
    expect(result.defending).to.deep.include(
      { name: 'Battering Ram', total: 1, killed: 1 }
    )
    expect(result.defending).to.deep.include(
      { name: 'Wall', total: 5, killed: 5 }
    )
  })
})

describe('parseLine', () => {
  it('should return Troop', () => {
    const result = parseLine('Hoplite...............................423(-6)')

    expect(result.name).eq('Hoplite')
    expect(result.killed).eq(6)
    expect(result.total).eq(429)
  })

  it('should return nil', () => {
    const result = parseLine('.............................................')

    expect(result).to.be.null
  })
})