module.exports = (sequelize, DataTypes) => {
  const ProductsCategory = sequelize.define("ProductsCategory", {
    category_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  });

  return ProductsCategory;
};
