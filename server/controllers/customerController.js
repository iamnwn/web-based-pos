const { where } = require("sequelize");
const db = require("../models");

const getAllCustomer = async (req, res) => {
  try {
    const customers = await db.Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCustomer = async (req, res) => {
  const data = req.body;
  await db.Customer.create(data)
    .then((result) => {
      res.status(201).json({ message: "Customer created" });
    })
    .catch((err) => {
      const { errors } = err;

      res.status(403).json({ errors });
    });
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const [rowsAffected] = await db.Customer.update(data, {
      where: { id: id },
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated" });
  } catch (error) {
    const { errors } = error;

    res.status(403).json({ errors });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await db.Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    await customer.destroy();
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await db.Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
};
