module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    storeLocation: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    storeName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
  return Store;
};
