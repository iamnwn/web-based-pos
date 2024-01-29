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
      allowNull: true,
    },
    quantityInStock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    boughtPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    maxDiscount: {
      type: DataTypes.DECIMAL(5, 2),
    },
    defaultDiscount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  await db.Products.hasOne(Stock);
  await Stock.belongsTo(db.Products);

  await Stock.hasMany(db.InvoiceLines, {
    as: "StockId",
    foreignKey: "id",
  });
  await db.InvoiceLines.belongsTo(Stock);

  await sequelize.sync();
  return Stock;
};
