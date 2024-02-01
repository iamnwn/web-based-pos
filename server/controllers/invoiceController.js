const Stock = require("../models/store/Stock");
const db = require("../models");
const { Op, where } = require("sequelize");

const getInvoiceData = async (req, res) => {
  let store = req.StoreId;

  if (!store) {
    store = "%%";
  }

  try {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const filterInput = req.query.filter;
    const offset = pageIndex * pageSize;

    const stocks = await db.Invoice.findAndCountAll({
      attributes: [
        "totalAmount",
        "Customer.firstName",
        "User.UserName",
        "id",
        "createdAt",
      ],
      where: {
        [Op.and]: [
          { StoreId: { [Op.like]: store } },
          { id: { [Op.like]: `%${filterInput}%` } },
        ],
      },
      include: [
        {
          model: db.Customer,
          attributes: [],
          required: false,
        },
        {
          model: db.Store,
          attributes: [],
        },
        {
          model: db.User,
          attributes: [],
        },
      ],
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

const createInvoice = async (req, res) => {
  const stocks = req.StoreId;
  const userName = req.userName;

  console.log(req.body);
  // const stock = await Stock(stocks);

  try {
    const user = await db.User.findOne({
      where: { userName: userName },
      attributes: ["id"],
    });
    const UserId = user.id;

    const invoice = {
      totalAmount: req.body.total,
      CustomerId: req.body.customer,
      StoreId: stocks,
      UserId: UserId,
    };

    const invoiceRec = await db.Invoice.create(invoice);
    console.log(invoiceRec.id);

    const lines = req.body.lines;
    const invoiceId = invoiceRec.id;

    lines.forEach((line) => {
      line.InvoiceId = invoiceId;
    });

    await db.InvoiceLines.bulkCreate(lines);

    res.status(200).json({ message: "Success !" });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  createInvoice,
  getInvoiceData,
};
