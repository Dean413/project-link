const role = (requiredRole) => {
  return (req, res, next) => {
    if (!req.userInfo || req.userInfo.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: "Only available to admin",
      });
    }
    next();
  };
};

module.exports = role;
