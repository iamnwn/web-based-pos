const Stock = require("../models/store/Stock");
const db = require("../models");
const { Op, where } = require("sequelize");

const createInvoice = async (req, res) => {
  const stocks = req.StoreId;
  const userName = req.userName;

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

    const linesRec = await db.InvoiceLines.bulkCreate(lines);

    res.status(200).json({ message: "Success !" });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  createInvoice,
};
