import client from './../../index'

/**
 * Controller for client ready event
 */
async function controller() {
  console.log(`Logged in as ${client.user.tag}!`);
}

export default controller