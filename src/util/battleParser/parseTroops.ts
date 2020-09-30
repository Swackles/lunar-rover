import Troop from "../Ikariam/troop"

/**
 * Parses the armies involved in the battle
 * @param input battle report information string
 */
function parseTroops(input: string) {
  let defending = []
  let attacking = []

  input.split(/\n/).forEach((row) => {
    // 0 is the attacker, 1 is the defender
    let side = row.split(' - ')

    defending.push(parseLine(side[1]))
    attacking.push(parseLine(side[0]))
  })

  return {
    defending: defending.filter((e) => { return e != null }),
    attacking: attacking.filter((e) => { return e != null })
  }
}

function parseLine(input: string): Troop | null {
  /**
   * 1 - The unit name
   * 2 - The amount of units left
   * 3 - The amount of units killed
   */
  const regex = /(.*?)[.]+(\d+)\(-(\d+)\)/

  let value = input.match(regex)
  if (value == null) return null

  let troop = new Troop(value[1])
  troop.killed = parseInt(value[3])
  troop.total = parseInt(value[2]) + troop.killed

  return troop
}

export default parseTroops