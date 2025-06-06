const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/events", require("./events"));
router.use("/users", require("./users"));

// login route
router.get("/login", passport.authenticate("github"));

//logout route
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use('/sponsors', require('./sponsors'));

module.exports = router;
