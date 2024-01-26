const { Sequelize } = require("sequelize");
const database = new Sequelize("node-app", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = database;
