const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../database/db-connect");

class OrderItem extends Model {}

OrderItem.init(
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
  { sequelize, modelName: "orderItem" }
);

module.exports = OrderItem;
