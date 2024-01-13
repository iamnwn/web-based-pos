module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define("Stores", {
    store_location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    store_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
    },
  });
  return Stores;
};
