// controllers
import message from "./util/events/message";
import ready from "./util/events/ready";

// config
import config from "./config/application"

// Sentry
import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"

Sentry.init(config.sentry);

const Discord = require('discord.js')
const client = new Discord.Client();

try {  
  // Controllers
  client.on('ready', ready );
  client.on('message', message);

  client.login(config.tokens.discord);
} catch(e) {
  if (config.env == 'production') Sentry.captureException(e);
  else throw e
}

export default client