const express = require("express");

const ProductController = require("../controllers/product_controller").ProductController();

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", ProductController.new);

// /admin/add-product => POST
router.post("/add-product", ProductController.create);

router.use("/products", ProductController.getAdminProducts);

router.post("/delete-product", ProductController.delete);

router.get('/edit-product/:productId', ProductController.edit)

router.post('/edit-product', ProductController.update)

module.exports = router;
