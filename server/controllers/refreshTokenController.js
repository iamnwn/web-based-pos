const db = require("../models");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  const foundUser = await db.User.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.userName !== decoded.userName)
      return res.sendStatus(403);
    const userRole = foundUser.userRole;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userName: foundUser.userName,
          StoreId: foundUser.StoreId,
          userRole: userRole,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" }
    );
    const data = {
      userRole: userRole,
      userName: foundUser.userName,
      StoreId: foundUser.StoreId,
      accessToken: accessToken,
    };
    res.status(200).json({ data });
  });
};

module.exports = { handleRefreshToken };
