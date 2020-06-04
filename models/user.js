const Sequelize = require("sequelize");
const sequelize = require("../database/db-connect");
const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
