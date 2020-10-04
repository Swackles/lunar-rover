import client from './../../index'

const pkg = require('../../../package.json');

/**
 * Controller for client ready event
 */
async function controller() {
  console.log(`Logged in as ${client.user.tag}!`);
  await client.user.setActivity(`v${pkg.version}`, { type: 'PLAYING' })
}

export default controller