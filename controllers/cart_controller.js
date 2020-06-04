const Product = require("../models/product");
const Cart = require("../models/cart");

const CartController = () => {
  return {
    getCart: async (req, res, next) => {
      const user = req.user;
      const grabCart = await user.getCart();
      const cart = grabCart;
      const getProducts = await cart.getProducts();
      const cartProducts = getProducts;

      try {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: cartProducts,
          totalPrice: "",
        });
      } catch (error) {
        console.log(error);
      }
    },
    setCart: async (req, res, next) => {
      const productId = req.body.productId;
      const user = req.user;
      const getCart = await user.getCart();
      const cart = getCart;
      const getProducts = await cart.getProducts({ where: { id: productId } });
      const cartProducts = getProducts;
      let product = null;
      let newQuantity = 1;

      try {
        if (cartProducts.length > 0) {
          product = cartProducts[0];
        }

        if (product !== null) {
          const oldQuantity = product.cartItem.quantity;

          newQuantity = oldQuantity + 1;

          await cart.addProduct(product, {
            through: { quantity: newQuantity },
          });

          res.redirect("/cart");
        }

        return Product.findByPk(productId)
          .then((product) => {
            return cart.addProduct(product, {
              through: { quantity: newQuantity },
            });
          })
          .then(() => {
            res.redirect("/cart");
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    },

    deleteProductFromCart: async (req, res, next) => {
      const productId = req.body.productId;
      const user = req.user;
      const getCart = await user.getCart();
      const cart = getCart;
      const getProducts = await cart.getProducts({ where: { id: productId } });
      const product = getProducts[0];
      const quantity = product.cartItem.quantity;

      try {
        if (quantity > 1) {
          product.cartItem.quantity = quantity - 1;
          product.cartItem.save();
          res.redirect("/cart");
        } else {
          await product.cartItem.destroy();
          res.redirect("/cart");
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
};

exports.CartController = CartController;
