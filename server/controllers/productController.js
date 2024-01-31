const db = require("../models");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  const data = req.body;
  await db.Products.create(data)
    .then((result) => {
      res.status(201).json({ message: "Product category created !" });
    })
    .catch((err) => {
      console.log(err);
      const { errors } = err;
      res.status(403).json(errors);
    });
};

const getProductData = async (req, res) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const filterInput = req.query.filter;
    const offset = pageIndex * pageSize;

    const products = await db.Products.findAndCountAll({
      where: {
        productName: { [Op.like]: `%${filterInput}%` },
      },
      attributes: [
        "id",
        "productName",
        "productDetails",
        "ProductsCategoryId",
        "ProductsCategory.categoryName",
      ],
      include: {
        model: db.ProductsCategory,
        attributes: [],
      },
      raw: true,
      limit: pageSize,
      offset: offset,
    });

    //

    const totalItems = products.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalItems) {
      console.log(products.rows);
      res.send({
        data: products.rows,
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

const updateProduct = async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const data = req.body;
    const [rowsAffected] = await db.Products.update(data, {
      where: { id: id },
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    console.log(error);
    const { errors } = error;

    res.status(403).json(errors);
  }
};

module.exports = { createProduct, getProductData, updateProduct };
