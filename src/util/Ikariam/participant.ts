/**
 * Battle participant class
 */
export default class Participant {
  name: string
  alliance: string
  town: string

  constructor(name: string, alliance: string, town: string) {
    this.name = name
    this.alliance = alliance
    this.town = town
  }
}
