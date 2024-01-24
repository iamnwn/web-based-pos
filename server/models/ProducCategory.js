module.exports = (sequelize, DataTypes) => {
  const ProductsCategory = sequelize.define("ProductsCategory", {
    categoryName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  });

  return ProductsCategory;
};
