import { expect } from "chai";
import { describe, it } from 'mocha'

import BattleReport from "./../../../src/util/Ikariam/battleReport";

describe('Constructor', () => {
  it('valid type', () =>{
    let result = new BattleReport('SeA', 'TestCity', new Date)
    let resultTwo = new BattleReport('LaND', 'TestCity', new Date)

    expect(result.type).equal('SEA')
    expect(resultTwo.type).equal('LAND')
  })

  it('invalid type', () => {    
    expect(() => {
      new BattleReport('data', 'TestCity', new Date)
    }).to.throw( Error, 'Battle type DATA is unknown')
  })
})