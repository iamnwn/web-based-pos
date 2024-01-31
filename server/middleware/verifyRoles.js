const verifyRoles = (rolesArray) => {
  return (req, res, next) => {
    if (!req?.userRole) return res.sendStatus(401);

    const result = rolesArray.find((e) => e === req.userRole);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
