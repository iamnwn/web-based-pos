const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  if (!userName || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await db.User.findOne({
    where: { userName: userName },
  });
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = await bcrypt.compare(password, foundUser.passwordHash);
  if (match) {
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
    const refreshToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "48h" }
    );

    foundUser.set({
      refreshToken: refreshToken,
    });
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const data = {
      userRole: userRole,
      userName: userName,
      StoreId: foundUser.StoreId,
      accessToken: accessToken,
    };

    res.status(200).json(data);
    console.log(data);
  } else {
    res.sendStatus(401);
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await db.User.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  foundUser.set({
    refreshToken: "",
  });
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogin, handleLogout };
