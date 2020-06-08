const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient;
let _db = null;

const mongoConnection = async (callback) => {
  const client = await MongoClient.connect(
    "mongodb+srv://alex:gTwA8dMTGDxgaZ6q@product-store-project-j9wj4.mongodb.net/shop?retryWrites=true&w=majority", { useUnifiedTopology: true }
  );

  try {
    console.log("connected");
    _db = client.db();
    callback();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDatabase = () => {
  try {
    if (_db !== null) {
      return _db;
    }
  } catch (error) {
    throw { error: error, message: "No Database Found!!!!" };
  }
};

exports.mongoConnection = mongoConnection;

exports.getDatabase = getDatabase;
