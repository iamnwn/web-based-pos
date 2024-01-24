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
      type: DataTypes.INTEGER,
    },
  });

  return InvoiceLines;
};
