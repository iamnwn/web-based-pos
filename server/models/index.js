"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var basename = path.basename(__filename);
const process = require("process");
// const Customer = require("./Customer");
// const User = require("./User");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    let model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Customer.hasOne(db.User);
db.Customer.hasMany(db.Invoice);
db.User.hasMany(db.Invoice);
db.Stores.hasMany(db.Invoice);
db.Invoice.hasMany(db.InvoiceLines);
db.Products.hasMany(db.InvoiceLines);
db.ProductsCategory.hasMany(db.Products);
db.Stores.hasOne(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
