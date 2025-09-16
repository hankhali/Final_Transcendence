const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const dotenv = require('dotenv');
dotenv.config();

const db = require('../queries/database');

function findOrCreateUserFromGoogleProfile(profile) {
  const googleId = profile.id;
  const email = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value : null;
  const displayName = profile.displayName || email || `user_${googleId.substring(0, 6)}`;

  const existingUser = db.prepare('SELECT id, username, alias, email, avatar FROM users WHERE google_id = ? OR email = ?').get(googleId, email);
  if (existingUser) {
    return existingUser;
  }
  const usernameToUse = email || `google_${googleId.substring(0, 10)}`;
  const aliasToUse = displayName;

  const insert = db.prepare('INSERT INTO users (alias, username, email, google_id) VALUES (?, ?, ?, ?)');
  const info = insert.run(aliasToUse, usernameToUse, email, googleId);

  const createdUser = db.prepare('SELECT id, username, alias, email, avatar FROM users WHERE id = ?').get(info.lastInsertRowid);
  return createdUser;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const user = findOrCreateUserFromGoogleProfile(profile);
        done(null, { id: user.id, username: user.username, alias: user.alias });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = db.prepare('SELECT id, username, alias, email, avatar FROM users WHERE id = ?').get(id);
    done(null, user || null);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;