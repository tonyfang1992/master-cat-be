const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const productController = require("../controllers/apis/productController");
const categoryController = require("../controllers/apis/categoryController");
const userController = require("../controllers/apis/userController");

const authenticated = passport.authenticate("jwt", { session: false });

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.get("/profile/:id", userController.getUser);
router.get("/get_current_user", authenticated, userController.getCurrentUser);

router.get("/products", productController.getProducts);
router.get("/products/top", productController.getTopProducts);
router.get("/products/new", productController.getNewProducts);
router.get("/products/hot", productController.getHotProducts);
router.get("/products/:id", productController.getProduct);

router.get("/activity", categoryController.getMenu);
router.get("/category/:id", categoryController.getCategory);
router.get("/subcategory/:id", categoryController.getSubCategory);
router.get("/thisweekactivity/:id", categoryController.getThisWeekActivity);
router.get("/newactivity/:id", categoryController.getNewActivity);
module.exports = router;
