const express = require("express");
const router = express.Router();

const productController = require("../controllers/apis/productController");
const categoryController = require("../controllers/apis/categoryController");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);

router.get("/activity", categoryController.getMenu);

module.exports = router;
