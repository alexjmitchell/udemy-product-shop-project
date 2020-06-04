const Product = require("../models/product");
const Cart = require("../models/cart");

const ProductController = () => {
  // const products = Product.fetchAll();

  return {
    index: (req, res, next) => {
      Product.findAll()
        .then((products) => {
          res.render("shop/product-list", {
            products: products,
            pageTitle: "Products",
            path: "/products",
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // Product.fetchAll()
      //   .then(([rows, fieldData]) => {
      //     res.render("shop/product-list", {
      //       products: rows,
      //       pageTitle: "Products",
      //       path: "/products",
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    new: (req, res, next) => {
      Product.findAll()
        .then((products) => {
          res.render("admin/edit-products", {
            products: products,
            pageTitle: "Product Form",
            path: "/admin/add-product",
            editing: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // Product.fetchAll()
      //   .then(([rows, fieldData]) => {
      //     res.render("admin/edit-products", {
      //       products: rows,
      //       pageTitle: "Product Form",
      //       path: "/admin/add-product",
      //       editing: false,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    create: (req, res, next) => {
      const title = req.body.title;
      const imageURL = req.body.imageURL;
      const description = req.body.description;
      const price = req.body.price;

      req.user
        .createProduct({
          title: title,
          price: price,
          imageURL: imageURL,
          description: description,
        })
        .then((result) => {
          console.log("created product", result);
          res.redirect("/admin/products");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    edit: async (req, res, next) => {
      const editMode = req.query.edit;

      const productId = req.params.productId;

      if (!editMode) {
        return res.redirect("/");
      }

      const user = req.user;

      const getProduct = await user.getProducts({ where: { id: productId } });

      const product = getProduct[0];

      try {
        if (!product) {
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

    update: (req, res, next) => {
      const productId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedPrice = req.body.price;
      const updatedDescription = req.body.description;
      const updatedImageURL = req.body.imageURL;

      Product.findByPk(productId)
        .then((product) => {
          product.title = updatedTitle;
          product.price = updatedPrice;
          product.description = updatedDescription;
          product.imageURL = updatedImageURL;

          return product.save();
        })
        .then((result) => {
          res.redirect("/admin/products");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    show: (req, res, next) => {
      const productId = req.params.productId;
      console.log("productId ==========>>", productId);
      Product.findByPk(productId)
        .then((product) => {
          res.render("shop/product-detail", {
            pageTitle: `Product - ${product.title.toUpperCase()}`,
            truePath: `/products/${product.id}`,
            path: "/products",
            product: product,
          });
        })
        .catch((error) => {
          throw error;
        });
    },

    delete: (req, res, next) => {
      const productId = req.body.productId;

      Product.destroy({ where: { id: productId } })
        .then((result) => {
          res.redirect("/admin/products");
        })
        .catch((error) => {
          console.log(error);
        });

      // Can also be done like this
      // Product.findByPk(productId)
      //   .then((product) => {
      //     product.destroy();
      //   })
      //   .then((result) => {
      //     res.redirect("/admin/products");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    setOrders: (req, res, next) => {
      Product.findAll()
        .then((products) => {
          res.render("shop/orders", {
            pageTitle: "Orders",
            path: "/orders",
            products: products,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAdminProducts: async (req, res, next) => {
      const getProducts = await req.user.getProducts();
      const products = getProducts;

      try {
        res.render("admin/products", {
          pageTitle: "Admin Products",
          path: "/admin/products",
          products: products,
        });
      } catch (error) {
        console.log(error);
      }
    },

    checkout: (req, res, next) => {
      res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
    },
  };
};

exports.ProductController = ProductController;
