const express = require("express");

const ProductController = require("../controllers/product_controller").ProductController();

const CartController = require("../controllers/cart_controller").CartController();

const StaticController = require("../controllers/static_controller").StaticController();

const OrderController = require("../controllers/order_controller").OrderController();

const router = express.Router();

router.get("/products", ProductController.index);

router.get("/products/:productId", ProductController.show)

router.get("/cart", CartController.getCart);

router.post("/cart",CartController.setCart);

router.post("/cart-delete-item", CartController.deleteProductFromCart)

router.get("/checkout", ProductController.checkout);

router.post("/create-order", OrderController.createOrder);

router.get("/orders", OrderController.getOrder)

router.get("/", StaticController.home);

module.exports = router;
