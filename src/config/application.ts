const config = {
  version: '1.1.5',
  env: process.env.NODE_ENV || 'development',
  tokens: {
    discord: process.env.TOKEN_DISCORD,
    sentry: process.env.TOKEN_SENTRY
  },
  allowedRoles: process.env.ALLOWED_ROLES || 'leadership',
  sentry: null,
  roles: {
    newMember: process.env.NEW_MEMBER
  },
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