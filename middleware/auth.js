const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }
  
  const adminToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(adminToken, "supersecret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid." });
  }
}

module.exports = {
  verifyToken
}