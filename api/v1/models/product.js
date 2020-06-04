const Cart = require("./cart");
const db = require("../database/db-connect");

class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      `
      INSERT INTO products (title,imageURL, description, price)
      VALUES (?, ?, ?, ?)
      `,
      [this.title, this.imageURL, this.description, this.price]
    );
  }

  static delete(id) {}

  static fetchAll() {
    return db.execute(`SELECT * FROM products`);
  }

  static fetchProductById(id) {
    return db.execute(`SELECT * FROM products WHERE id = ?`, [Number(id)])
  }
}

module.exports = Product;
