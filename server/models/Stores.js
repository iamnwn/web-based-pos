module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define("Stores", {
    storeLocation: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    storeName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
  return Stores;
};
