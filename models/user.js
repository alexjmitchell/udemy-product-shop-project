const getDb = require("../database/db-connect").getDatabase;
const mongoDB = require("mongodb");

class User {
  constructor(username, email, id = null) {
    this.name = username;
    this.email = email;
    this._id = id;
  }

  async save() {
    const database = getDb();

    try {
      if (this._id !== null) {
        await database.collection("users").updateOne(
          { _id: new mongoDB.ObjectID(this._id) },
          {
            $set: {
              name: this.name.toString(),
              email: this.email.toString(),
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
        await database.collection("users").insertOne(this);
        console.log("User Created!!!!");
      }
    } catch (error) {
      throw error;
    }
  }

  static async findById(userId) {
    const database = getDb();

    const user = await database
      .collection("users")
      .find({ _id: new mongoDB.ObjectID(userId) })
      .next();

    try {
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
