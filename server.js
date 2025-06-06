require("dotenv").config();
const mongodb = require("./data/database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const { connectMongoose } = require("./data/mongooseConnection");

connectMongoose();

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: "false",
      saveUninitialized: true,
    })
  )
  // init basic express session
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  //allow passport to use 'express-session'
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use(cors({ methods: ["GET, POST, PUT, DELETE, OPTIONS"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes"));

// Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // accessToken and refreshToken are used by GitHub, even if the current function does not
      return done(null, profile);
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
app.get("/", (req, res) => {
  // #swagger.tags=['341CSE Team 6 Project']
  const loginStatus =
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : `Logged Out`;

  res.send(`341CSE Team 6 Project - ${loginStatus}`);
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Uncaught Exception Handler
process.on("uncaughtException", (err, origin) => {
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
