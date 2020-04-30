const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const multer = require("multer");
const upload = multer({ dest: "temp/" });

const productController = require("../controllers/apis/productController");
const categoryController = require("../controllers/apis/categoryController");
const userController = require("../controllers/apis/userController");
const catController = require("../controllers/apis/catController");
const cartController = require("../controllers/apis/cartController");
const orderController = require("../controllers/apis/orderController");
const adminController = require("../controllers/apis/adminController");

const authenticated = passport.authenticate("jwt", { session: false });
const owner = (req, res, next) => {
  req.body.owner = req.user.id;
  return next();
};
const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role === "admin") {
      return next();
    }
    return res.json({ status: "error", message: "沒有權限" });
  } else {
    return res.json({ status: "error", message: "沒有該使用者" });
  }
};

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.get("/profile/:id", authenticated, userController.getUser);
router.post("/profile", authenticated, userController.postUser);
router.get("/get_current_user", authenticated, userController.getCurrentUser);

router.get("/cat/:id", authenticated, catController.getCat);
router.post("/cat", authenticated, catController.postCat);
router.put("/cat", authenticated, catController.putCat);

router.get("/products", productController.getProducts);
router.get("/products/top", productController.getTopProducts);
router.get("/products/new", productController.getNewProducts);
router.get("/products/hot", productController.getHotProducts);
router.get("/products/:id", productController.getProduct);
//沒有登入情況下，也能將商品加入購物車
router.get("/cart/:id", cartController.getCart);
router.get("/checkout/:id", authenticated, cartController.getCheckoutCart);
router.post("/cart", cartController.postCart);
router.post("/cartItem/:id/add", cartController.addCartItem);
router.post("/cartItem/:id/sub", cartController.subCartItem);
router.delete("/cartItem/:id", cartController.deleteCartItem);
//需登入才能成立、查詢訂單
router.get("/orders/:id", authenticated, orderController.getOrders);
router.post("/order", authenticated, orderController.postOrder);
router.delete("/order/:id/cancel", authenticated, orderController.cancelOrder);
router.get("/order/:id/payment", authenticated, orderController.getPayment);
router.post("/spgateway/callback", orderController.spgatewayCallback);

router.get("/activity", categoryController.getMenu);
router.get("/category/:id", categoryController.getCategory);
router.get("/subcategory/:id", categoryController.getSubCategory);
router.get("/thisweekactivity/:id", categoryController.getThisWeekActivity);
router.get("/newactivity/:id", categoryController.getNewActivity);
router.get("/feed/:id", categoryController.getFeed);
router.get("/feedage/:id", categoryController.getFeedAge);
router.get("/feedfunction/:id", categoryController.getFeedFunction);
router.get("/can/:id", categoryController.getCan);
router.get("/cantype/:id", categoryController.getCanType);

router.get(
  "/admin/CreateProduct",
  authenticated,
  authenticatedAdmin,
  adminController.getCreateProduct
);
router.get(
  "/admin/EditProduct/:id",
  authenticated,
  authenticatedAdmin,
  adminController.getEditProduct
);
router.get(
  "/admin/store",
  authenticated,
  authenticatedAdmin,
  adminController.getStore
);
router.post(
  "/admin/NewProduct",
  authenticated,
  authenticatedAdmin,
  upload.single("image"),
  adminController.postNewProduct
);
router.put(
  "/admin/EditProduct/:id",
  authenticated,
  authenticatedAdmin,
  upload.single("image"),
  adminController.putEditProduct
);
router.post(
  "/admin/NewActivity",
  authenticated,
  authenticatedAdmin,
  upload.single("image"),
  adminController.postNewActivity
);

module.exports = router;
