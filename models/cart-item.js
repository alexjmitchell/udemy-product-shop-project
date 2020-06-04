const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../database/db-connect");

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize, modelName: "cartItem" }
);

module.exports = CartItem;
