const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../database/db-connect");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "cart" }
);


module.exports = Cart;