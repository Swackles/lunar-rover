import Participant from "./participant";

export default class BattleReport {
  type: string
  city: string
  datetime: Date
  input: Participant[]

  constructor(type: string, city: string, datetime: Date) {
    this.type = type.toUpperCase()
    if (this.type != "LAND" && this.type != "SEA") throw new Error(`Battle type ${this.type} is unknown`);
    
    this.city = city
    this.datetime = datetime
  }

  set attackers(input: Participant[]) {
    this.attackers = input
  }

  set defenders(input: Participant[]) {
    this.defenders = input
  }

  get isLandBattle() {
    return this.type == 'LAND' 
  }
  get isSeaBattle() {
    return this.type == 'SEA'
  }
}