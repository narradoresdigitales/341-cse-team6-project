const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json('Authentication required.');
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  if (!req.session.user.isAdmin) {
    return res.status(403).json({ message: 'Admin privileges required.' });
  }

  next();
};

module.exports = { isAuthenticated, isAdmin };
