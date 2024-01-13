module.exports = (sequelize, DataTypes) => {
  const InvoiceLines = sequelize.define("InvoiceLines", {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    sub_total: {
      type: DataTypes.FLOAT,
    },
    store: {
      type: DataTypes.INTEGER,
    },
  });

  return InvoiceLines;
};
