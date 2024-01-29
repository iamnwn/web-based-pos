const db = require("../models");
const { QueryTypes, Association } = require("sequelize");
const { Op } = require("sequelize");

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: {
        exclude: ["passwordHash"],
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createUser = async (req, res) => {
  const isCreated = await db.sequelize.query(
    "SELECT id FROM user WHERE CustomerId = :search_name OR nic = :nic OR userName = :userName",
    {
      replacements: {
        search_name: req.body.CustomerId,
        nic: req.body.nic,
        userName: req.body.userName,
      },
      type: QueryTypes.SELECT,
    }
  );
  if (Boolean(isCreated[0]) === true) {
    res.status(400).json({
      error:
        "Already exist ! Select another customer or input correct NIC or try another username",
    });
  } else {
    try {
      await db.User.create(req.body);
      res.status(201).json({ message: "New user created !" });
    } catch (err) {
      //
      res.status(500).json({ error: "Internal Server Error !" });
    }
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findByPk(userId, {
      attributes: {
        exclude: ["passwordHash"],
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
  //
  console.log(req.body, req.params);
  const isCreated = await db.sequelize.query(
    "SELECT id FROM user WHERE nic = :nic OR userName = :userName",
    {
      replacements: {
        nic: req.body.nic,
        userName: req.body.userName,
      },
      type: QueryTypes.SELECT,
    }
  );

  if (isCreated[0] === undefined) {
    return res.status(404).json({ error: "User not found" });
  } else if (isCreated[0].id !== req.body.id) {
    res.status(400).json({
      error: "Can't duplicate NIC or user name",
    });
  } else {
    try {
      const id = req.params.id;
      await db.User.update(req.body, {
        where: { id: id },
      });

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(403).json({ error: "Internal Server Error" });
    }
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

const getUsersData = async (req, res) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const filterInput = req.query.filter;
    const offset = pageIndex * pageSize;

    const users = await db.User.findAndCountAll({
      where: {
        nic: { [Op.like]: `%${filterInput}%` },
      },
      attributes: [
        "id",
        "nic",
        "emergencyContact",
        "state",
        "district",
        "postalCode",
        "userRole",
        "userName",
        "isActive",
        "StoreId",
        "createdAt",
        "Customer.firstName",
        "Customer.lastName",
        "Customer.contact",
        "Customer.email",
        "Customer.city",
        "Store.storeName",
      ],
      include: [
        {
          model: db.Customer,
          attributes: [],
        },
        {
          model: db.Store,
          attributes: [],
        },
      ],

      raw: true,
      limit: pageSize,
      offset: offset,
    });

    const totalItems = users.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalItems) {
      console.log(users);
      res.send({
        data: users.rows,
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
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsersData,
};
