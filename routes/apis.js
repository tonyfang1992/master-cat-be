const express = require("express");
const router = express.Router();

const productController = require("../controllers/apis/productController");
const categoryController = require("../controllers/apis/categoryController");

router.get("/products", productController.getProducts);
router.get("/products/top", productController.getTopProducts);
router.get("/products/new", productController.getNewProducts);
router.get("/products/:id", productController.getProduct);

router.get("/activity", categoryController.getMenu);
router.get("/category/:id", categoryController.getCategory);
router.get("/subcategory/:id", categoryController.getSubCategory);
router.get("/thisweekactivity/:id", categoryController.getThisWeekActivity);
router.get("/newactivity/:id", categoryController.getNewActivity);
module.exports = router;
