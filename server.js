require('dotenv').config();
const mongodb = require('./data/database');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const { connectMongoose } = require('./data/mongooseConnection');
const User = require('./models/usersModel');

connectMongoose();

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: 'secret',
      resave: 'false',
      saveUninitialized: true,
    })
  )
  // init basic express session
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  //allow passport to use 'express-session'
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use(cors({ methods: ['GET, POST, PUT, DELETE, OPTIONS'] }))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes'));

// Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Find user by GitHub ID
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // Create a new user
          user = new User({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName || null,
          });
          await user.save();
        } else {
          // Update user if displayName is provided and has changed
          let updated = false;

          if (
            profile.displayName !== null &&
            profile.displayName !== user.displayName
          ) {
            user.displayName = profile.displayName;
            updated = true;
          }

          if (updated) await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error('GitHub Strategy error:', err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Endpoints
app.get('/', (req, res) => {
  // #swagger.tags=['341CSE Team 6 Project']
  const loginStatus =
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : `Logged Out`;

  res.send(`341CSE Team 6 Project - ${loginStatus}`);
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    
  }),
  async (req, res) => {
    try {
      const user = await User.findOne({ githubId: req.user.githubId });

      if (!user) {
        return res.status(404).json({ message: 'User not found in DB' });
      }
      req.session.user = {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        isAdmin: true
      };

      res.redirect('/');
    } catch (err) {
      console.error('Error in GitHub callback:', err);
      res.status(500).json({ message: 'Internal server error during login' });
    }
  }
);

// Uncaught Exception Handler
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.id,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// init MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});
