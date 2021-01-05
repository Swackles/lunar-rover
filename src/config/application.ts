const config = {
  version: '1.1.3',
  env: process.env.NODE_ENV || 'development',
  tokens: {
    discord: process.env.TOKEN_DISCORD,
    sentry: process.env.TOKEN_SENTRY
  },
  allowedRoles: process.env.ALLOWED_ROLES || 'leadership',
  sentry: null,
  channel: {
    log: process.env.LOG_CHANNEL
  }
}

// Sentry configuration
config.sentry = {
  dsn: config.tokens.sentry,
  tracesSampleRate: 1.0
}

export default config