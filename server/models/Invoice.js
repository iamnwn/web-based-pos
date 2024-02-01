module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    totalAmount: {
      type: DataTypes.FLOAT,
    },
    createAT: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Invoice;
};
