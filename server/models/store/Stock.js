const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const db = require("..");

module.exports = async (tableName) => {
  const Stock = sequelize.define(tableName, {
    batch: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    quantity_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bought_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    max_discount: {
      type: DataTypes.DECIMAL(5, 2),
    },
    default_discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  await Stock.belongsTo(db.Products, {
    as: "product",
    onDelete: "RESTRICT",
  });

  await sequelize.sync();
  return Stock;
};
