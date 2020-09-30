/**
 * Controller for the command
 * @param message Discord.Message
 */
async function controller(message) {
  if (message.content[0] != '!') return
  let args = message.content.split(' ')
  args[0] = args[0].replace('!', '')

  switch()
}

export default controller