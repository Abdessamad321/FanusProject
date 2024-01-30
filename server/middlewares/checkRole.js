const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next, roles) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ err: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ err: "Unauthorized" });
  }

  jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err: "Unauthorized" });
    }

    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ err: "Forbidden - Insufficient Role" });
    }

    req.user = decoded;
    next();
  });
};

const checkAdminRole = (req, res, next) => {
  verifyToken(req, res, next, ["admin", "superAdmin"]);
};

const checkSuperAdminRole = (req, res, next) => {
  verifyToken(req, res, next, ["superAdmin"]);
};

module.exports = {
  checkAdminRole,
  checkSuperAdminRole
};