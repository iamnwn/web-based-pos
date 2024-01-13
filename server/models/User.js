const db = require("./");
const Customer = require("./Customer");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nic: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    emergency_contact: {
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
    user_role: {
      type: DataTypes.ENUM("admin", "manager", "salesmen"),
      defaultValue: "salesmen",
    },
    user_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return User;
};
