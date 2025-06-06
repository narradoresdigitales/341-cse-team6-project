const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json('Only admins can access this route.');
  }
  next();
};

module.exports = { isAuthenticated };
