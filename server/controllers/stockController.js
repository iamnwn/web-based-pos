const Stock = require("../models/store/Stock");
const db = require("../models");
const { Op, where } = require("sequelize");
// app.get("/", async (req, res) => {
//   let store = Stock("18");
//   store.then((result) => {
//     res.send(result.findAll());
//   });
// });

const createStock = async (req, res) => {
  // console.log(req.StoreId);
  const stocks = req.StoreId;
  console.log(req.body);
  const stock = await Stock(stocks);
  // console.log(stock);

  await stock
    .create(req.body)
    .then((result) => {
      res.status(201).json({ message: "Stock created !" });
    })
    .catch(async (err) => {
      console.log(err);
    });
};

const getStockData = async (req, res) => {
  const store = req.StoreId;

  const stock = await Stock(store);
  try {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const filterInput = req.query.filter;
    const offset = pageIndex * pageSize;

    const stocks = await stock.findAndCountAll({
      attributes: [
        "id",
        "batch",
        "barcode",
        "quantityInStock",
        "boughtPrice",
        "unitPrice",
        "maxDiscount",
        "defaultDiscount",
        "available",
        "ProductId",

        "Product.productName",
      ],
      include: {
        model: db.Products,
        attributes: [],
        where: {
          productName: { [Op.like]: `%${filterInput}%` },
        },
      },
      raw: true,
      limit: pageSize,
      offset: offset,
    });

    //

    const totalItems = stocks.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalItems) {
      console.log(stocks.rows);
      res.send({
        data: stocks.rows,
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
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createStock,
  getStockData,
};
