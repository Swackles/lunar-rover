import Participant from "../Ikariam/participant"

/**
 * Parses the general information about the battle
 * @param input battle report information string
 */
function parseInformation(input) {
  /**
   * capture groups
   * 1 - type of battle
   * 2 - city where it happened
   * 3 - datetime
   * 4 - attackers (seperated by ,)
   * 5 - defenders (seperated by ,)
   */
  const regex = /[Bb]attle (for|near) (.*?) \(([\d. :]+)\) (.*?) vs (.*?)$/

  let data = input.match(regex)

  let attackers = data[4].split(', ').map(x => parseParticipant(x))
  let defenders = data[5].split(', ').map(x => parseParticipant(x))
  
  let date = data[3].split(' ')[0].split('.').reverse().join('-')
  let time = data[3].split(' ')[1]

  let dateTime = new Date(date + "T" + time)

  return {
    type: data[1] == 'for' ? 'LAND' : 'SEA',
    city: data[2],
    dateTime: dateTime,
    attackers: attackers,
    defenders: defenders
  }
}

function parseParticipant(input) {
  /**
   * capture groups
   * 1 - name
   * 2 - alliance, if nil then no alliance
   * 3 - city
   */
  const regex = /(.*?)(|\[.*?\]) from (.*?)$/

  let data = input.match(regex)

  let alliance = data[2] ? data[2].replace(/[\[\]]/g, '') : null
  return new Participant(data[1], alliance, data[3])
}

export default parseInformation