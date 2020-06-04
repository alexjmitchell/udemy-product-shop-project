const Product = require("../models/product");

const StaticController = () => {
  return {
    home: async (req, res, next) => {
      const products = await Product.findAll();

      try {
        res.render("shop/index", {
          pageTitle: "Shop",
          path: "/",
          products: products,
        });
      } catch (error) {
        throw { error_message: error.message };
      }
    },
  };
};

exports.StaticController = StaticController;
