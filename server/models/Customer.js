module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  });

  return Customer;
};
