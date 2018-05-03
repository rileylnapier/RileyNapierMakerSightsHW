require('dotenv').load();

module.exports = () => {
  let providers = [];

  if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
    providers.push({
      providerName: 'Facebook',
      providerOptions: {
        scope: ['email', 'public_profile']
      },
      Strategy: require('passport-facebook').Strategy,
      strategyOptions: {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        profileFields: ['id', 'displayName', 'email', 'link']
      },
      getProfile(profile) {
        // Normalize profile into one with {id, name, email} keys
        return {
          id: profile.id,
          name: profile.displayName,
          email: profile._json.email
        };
      }
    });
  }

  if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
    providers.push({
      providerName: 'Google',
      providerOptions: {
        scope: ['profile', 'email']
      },
      Strategy: require('passport-google-oauth').OAuth2Strategy,
      strategyOptions: {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      },
      getProfile(profile) {
        // Normalize profile into one with {id, name, email} keys
        return {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        };
      }
    });
  }

  return providers;
};
