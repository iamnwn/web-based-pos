module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    total_amount: {
      type: DataTypes.FLOAT,
    },
    createAT: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Invoice;
};
