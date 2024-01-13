const db = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: {
        exclude: ["password_hash"],
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json({ message: "New user created" });
  } catch (error) {
    const { errors } = err;

    res.status(403).json({ errors });
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await db.User.findByPk(userId, {
      attributes: {
        exclude: ["password_hash"],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await db.User.update(req.body, {
      where: { id: id },
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    const { errors } = err;

    res.status(403).json({ errors });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const rowsAffected = await db.User.destroy({
      where: { id: userId },
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
