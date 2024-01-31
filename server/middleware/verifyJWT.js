const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.userName = decoded.UserInfo.userName;
    req.userRole = decoded.UserInfo.userRole;
    req.StoreId = decoded.UserInfo.StoreId;
    console.log(req.userName, req.userRole, req.StoreId);
    next();
  });
};

module.exports = verifyJWT;
