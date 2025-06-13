const passport = require("passport");
const router = require("express").Router();




// login route
router.get(
  "/login", 
  //#swagger.tags = ['OAuth']
  //#swagger.summary = "Use Searchbar"
  passport.authenticate("github")
);

//logout route
router.get("/logout", 
  //#swagger.tags = ['OAuth']
  //#swagger.summary = "Use Searchbar"
  function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Swagger docs
router.use("/", require("./swagger"));

// API routes
router.use("/events", require("./events"));
router.use("/users", require("./users"));
router.use('/sponsors', require('./sponsors'));
router.use('/suppliers', require('./suppliers')); 

module.exports = router;
