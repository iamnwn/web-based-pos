module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    productName: {
      type: DataTypes.STRING(100),
    },
    productDetails: {
      type: DataTypes.STRING(200),
    },
  });

  return Products;
};
