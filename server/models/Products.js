module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    product_name: {
      type: DataTypes.STRING(100),
    },
    product_details: {
      type: DataTypes.STRING(200),
    },
  });

  return Products;
};
