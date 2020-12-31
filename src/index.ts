// controllers
import message from "./events/message";
import ready from "./events/ready";
import guildMemberAdd from "./events/guildMemberAdd";

// config
import config from "./config/application"

// Sentry
import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"

// Express
import * as express from "express" 

if (config.env == 'production') Sentry.init(config.sentry);

const Discord = require('discord.js')
const client = new Discord.Client();

try {  
  // Controllers
  client.on('ready', ready );
  client.on('message', message);
  client.on('guildMemberAdd', guildMemberAdd);

  client.login(config.tokens.discord);
} catch(e) {
  if (config.env == 'production') Sentry.captureException(e);
  else throw e
}

// Kubernetes health
const app = express()
app.get('/', (req, res) => { res.send(200) })
app.listen(80)

export default client