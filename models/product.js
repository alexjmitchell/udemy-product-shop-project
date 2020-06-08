const getDatabase = require("../database/db-connect").getDatabase;
const mongoDB = require("mongodb");

class Product {
  constructor(title, price, description, imageURL, id = null) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
    this._id = id;
  }

  async save() {
    const database = getDatabase();

    try {
      if (this._id !== null) {
        await database.collection("products").updateOne(
          { _id: new mongoDB.ObjectID(this._id) },
          {
            $set: {
              title: this.title.toString(),
              price: this.price.toString(),
              description: this.description.toString(),
              imageURL: this.imageURL.toString(),
            },
          },
          (err, res) => {
            if (err) {
              throw err;
            } else {
              console.log(res.result.nModified + " document(s) updated");
            }
          }
        );
      } else {
        await database.collection("products").insertOne(this);

        console.log("Product Created!!!!!!");
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const database = getDatabase();

    const products = await database.collection("products").find().toArray();

    try {
      // console.log("products from model ======>>>>", products);
      return products;
    } catch (error) {
      console.log(database);
      throw error;
    }
  }

  static async findById(id) {
    const database = getDatabase();

    const product = await database
      .collection("products")
      .find({ _id: new mongoDB.ObjectID(id) })
      .next();

    try {
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, title, price, description, imageURL) {
    const database = getDatabase();

    try {
      await database.collection("products").updateOne(
        { _id: mongoDB.ObjectID(id) },
        {
          $set: {
            title: title.toString(),
            price: price.toString(),
            description: description.toString(),
            imageURL: imageURL.toString(),
          },
        },
        (err, res) => {
          if (err) {
            throw err;
          } else {
            console.log(res.result.nModified + " document(s) updated");
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    const database = getDatabase();

    try {
      await database
        .collection("products")
        .deleteOne({ _id: mongoDB.ObjectID(id) }, (error, result) => {
          if (error) {
            throw error;
          }

          console.log("document deleted");
        });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
