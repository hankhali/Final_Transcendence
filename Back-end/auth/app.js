const express = require('express');
const session = require('express-session');
const passport = require('./passport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_me',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Authentication route to Google
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google sign-in
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).send('Missing JWT_SECRET');
    }
    const token = jwt.sign({ id: req.user.id, username: req.user.username }, jwtSecret, { expiresIn: '2h' });
    // Redirect back to frontend with token in URL hash to avoid logs
    res.redirect(`${frontendUrl}/#token=${encodeURIComponent(token)}`);
  }
);

// Logout route
app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Protected route example
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send('Welcome to the dashboard, ' + (req.user.alias || req.user.username));
});

// Start the server
const PORT = process.env.AUTH_PORT ? parseInt(process.env.AUTH_PORT) : 5002;
app.listen(PORT, () => {
  console.log(`Auth server is running on http://localhost:${PORT}`);
});