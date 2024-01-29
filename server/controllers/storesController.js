const { Op, where } = require("sequelize");
const { nanoid } = require("nanoid");

const db = require("../models");
const Stock = require("../models/store/Stock");

const getAllStore = async (req, res) => {
  try {
    const store = await db.Store.findAll();
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createStore = async (req, res) => {
  const id = nanoid(5);
  const data = { ...req.body, id: id };
  const result = db.Store.create(data);
  result
    .then(async (e) => {
      console.log(e.dataValues.id);
      await Stock(e.dataValues.id).then(() => {
        res.status(201).json({ message: "Store created !" });
      });
    })
    .catch(async (err) => {
      await db.Store.destroy({ where: { id: id } });
      console.log(err);
      res.status(400).json({ error: "Store created Failed !" });
    });
};

const updateStore = async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const data = req.body;
    const [rowsAffected] = await db.Store.update(data, {
      where: { id: id },
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    res.status(200).json({ message: "Store updated" });
  } catch (error) {
    const { errors } = error;

    res.status(403).json(errors);
  }
};

const deleteStore = async (req, res) => {
  try {
    const id = req.params.id;

    const store = await db.Store.findByPk(id);

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    await store.destroy();
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStore = async (req, res) => {
  try {
    const id = req.params.id;

    const store = await db.Store.findByPk(id);

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStoresData = async (req, res) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const filterInput = req.query.filter;
    const offset = pageIndex * pageSize;

    const store = await db.Store.findAndCountAll({
      where: {
        storeName: { [Op.like]: `%${filterInput}%` },
      },
      attributes: [
        "id",
        "storeName",
        "storeLocation",
        "User.nic",
        "User.Customer.firstName",
      ],
      limit: pageSize,
      offset: offset,
      include: [
        {
          model: db.User,
          where: { userRole: { [Op.like]: "manager" } },
          attributes: [],
          required: false,
          include: {
            model: db.Customer,
            attributes: [],
          },

          // where: { userRole: { [Op.ne]: "manager" } },
        },
      ],
      raw: true,
    });

    //

    const totalItems = store.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalItems) {
      console.log(store.rows);
      res.send({
        data: store.rows,
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

module.exports = {
  getAllStore,
  createStore,
  updateStore,
  deleteStore,
  getStore,
  getStoresData,
};
