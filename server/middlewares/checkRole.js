const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;

const checkAdminRole = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ err: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ err: "Unauthorized" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err: "Unauthorized" });
    }
    if (decoded.role !== "admin" && decoded.role !== "superAdmin") {
      return res
        .status(403)
        .json({ err: "Forbidden - Admin or Super Admin role required" });
    }
    next();
  });
};

const checkSuperAdminRole = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ err: "Unauthorized" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err: "Unauthorized" });
    }
    if (decoded.role !== "superAdmin") {
      return res.status(403).json({ err: "Forbidden - Super Admin role required" });
    }
    next();
  });
};

module.exports = {
  checkAdminRole: checkAdminRole,
  checkSuperAdminRole: checkSuperAdminRole,
};

