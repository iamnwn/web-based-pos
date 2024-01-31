const db = require("../models");

const createProductCategory = async (req, res) => {
  const data = req.body;
  await db.ProductsCategory.create(data)
    .then((result) => {
      res.status(201).json({ message: "Product category created !" });
    })
    .catch((err) => {
      console.log(err);
      const { errors } = err;
      res.status(403).json(errors);
    });
};

const getProductCategories = async (req, res) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const filterInput = req.query.filter;
    const offset = pageIndex * pageSize;

    const productCategories = await db.Product.findAndCountAll({
      where: {
        categoryName: { [Op.like]: `%${filterInput}%` },
      },
      limit: pageSize,
      offset: offset,
    });

    //

    const totalItems = productCategories.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalItems) {
      res.send({
        data: productCategories.rows,
        meta: {
          totalItems,
          totalPages,
          currentPage: pageIndex,
          pageSize,
        },
      });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createProductCategory, getProductCategories };
