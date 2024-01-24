const db = require("./");
const Customer = require("./Customer");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nic: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    emergencyContact: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userRole: {
      type: DataTypes.ENUM("admin", "manager", "salesmen"),
      defaultValue: "salesmen",
    },
    userName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });

  return User;
};
