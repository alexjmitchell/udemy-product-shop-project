const Product = require("../models/product");

const ProductController = () => {
  return {
    index: async (req, res, next) => {
      const products = await Product.findAll();

      try {
        res.render("shop/product-list", {
          products: products,
          pageTitle: "Products",
          path: "/products",
        });
      } catch (error) {
        throw error;
      }
    },

    new: (req, res, next) => {
      res.render("admin/edit-products", {
        products: [],
        pageTitle: "Product Form",
        path: "/admin/add-product",
        editing: false,
      });
    },

    create: async (req, res, next) => {
      const title = req.body.title;
      const imageURL = req.body.imageURL;
      const description = req.body.description;
      const price = req.body.price;

      const product = new Product(title, price, description, imageURL);

      try {
        await product.save();
        res.redirect("/admin/products");
      } catch (error) {
        console.log(error);
      }
    },

    edit: async (req, res, next) => {
      const editMode = req.query.edit;

      const productId = req.params.productId;

      const product = await Product.findById(productId);

      try {
        if (!product || !editMode) {
          return res.redirect("/");
        }

        res.render("admin/edit-products", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product: product,
        });
      } catch (error) {
        console.log(error);
      }
    },

    update: async (req, res, next) => {
      const productId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedPrice = req.body.price;
      const updatedDescription = req.body.description;
      const updatedImageURL = req.body.imageURL;

      const product = new Product(
        updatedTitle,
        updatedPrice,
        updatedDescription,
        updatedImageURL,
        productId
      );

      try {
        await product.save();
        res.redirect("/admin/products");
      } catch (error) {
        console.log(error);
      }
    },

    show: async (req, res, next) => {
      const productId = req.params.productId;

      const product = await Product.findById(productId);

      try {
        res.render("shop/product-detail", {
          pageTitle: `Product - ${product.title.toUpperCase()}`,
          truePath: `/products/${product._id}`,
          path: "/products",
          product: product,
        });
      } catch (error) {
        throw error;
      }
    },

    delete: async (req, res, next) => {
      const productId = req.body.productId;

      try {
        await Product.delete(productId);

        res.redirect("/admin/products");
      } catch (error) {
        throw error;
      }
    },

    getAdminProducts: async (req, res, next) => {
      // const getProducts = await req.user.getProducts();
      const products = await Product.findAll();

      try {
        res.render("admin/products", {
          pageTitle: "Admin Products",
          path: "/admin/products",
          products: products,
        });
      } catch (error) {
        throw { error_message: error.message };
      }
    },

    checkout: (req, res, next) => {
      res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
    },
  };
};

exports.ProductController = ProductController;
