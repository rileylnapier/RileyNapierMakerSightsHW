require('dotenv').load();

const nextAuthProviders = require('./next-auth.providers');
const nextAuthFunctions = require('./next-auth.functions');

const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

const sessionStore = new MongoStore({
  url: process.env.MONGO_URI,
  autoRemove: 'interval',
  autoRemoveInterval: 10, // Removes expired sessions every 10 minutes
  collection: 'sessions',
  stringify: false
});

module.exports = () =>
  nextAuthFunctions().then(functions => ({
    port: process.env.PORT || 3000,
    sessionSecret: 'super-secret',
    sessionMaxAge: 60000 * 60 * 24 * 7,
    sessionRevalidateAge: 60000,
    serverUrl: process.env.SERVER_URL || null,
    expressSession,
    sessionStore,
    providers: nextAuthProviders(),
    functions
  }));
