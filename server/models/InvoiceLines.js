module.exports = (sequelize, DataTypes) => {
  const InvoiceLines = sequelize.define("InvoiceLines", {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    subTotal: {
      type: DataTypes.FLOAT,
    },
    StockId: {
      type: DataTypes.STRING(5),
    },
  });

  return InvoiceLines;
};
