const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Instructor = sequelize.define("Instructor", {
  name: DataTypes.STRING
});

module.exports = Instructor;