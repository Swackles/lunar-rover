import { parse } from "path"
import Participant from "../Ikariam/participant"
import parseInformation from "./parseInformation"
import parseTroops from "./parseTroops"

function formatString(input) {
  /**
   * Splits into three parts
   * 0 - Information about battle
   * 1 - Participating armies
   * 2 - Score changes
   * 3 - Result of battle
   */
  const seperator = '---------------------------------------------------------------------------------------------'
  input = input.split(seperator)
  let report = parseInformation(input[0].replace(/\n/g, " ").trim())
  let armies = parseTroops(input[1])
}

export default formatString 