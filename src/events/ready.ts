import config from '../config/application';
import client from './../index'

/**
 * Controller for client ready event
 */
async function controller() {
  console.log(`Logged in as ${client.user.tag}!`);
  await client.user.setActivity(`v${config.version}`, { type: 'PLAYING' })
}

export default controller