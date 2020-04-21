const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const SubCategory = db.SubCategory;

const productController = {
  getProducts: (req, res, callback) => {
    return Product.findAll().then((products) => {
      callback({ products: JSON.parse(JSON.stringify(products)) });
    });
  },
  getProduct: (req, res, callback) => {
    return Product.findAll().then((Products) => {
      let productDetail = [];
      productDetail = Products.filter((product) => product.id == req.params.id);

      let SubCategoryTopProducts = [];
      let SubCategoryNewProducts = [];
      const SubCategoryProducts = Products.filter(
        (product) => product.SubcategoryId == productDetail[0].SubcategoryId
      );
      SubCategoryTopProducts = SubCategoryProducts.sort(
        (a, b) => b.SaleAmount - a.SaleAmount
      );
      SubCategoryNewProducts = SubCategoryProducts.sort(
        (a, b) => a.updatedAt - b.updatedAt
      );
      callback({
        product: JSON.parse(JSON.stringify(productDetail)),
        SubCategoryTopProducts: JSON.parse(
          JSON.stringify(SubCategoryTopProducts)
        ),
        SubCategoryNewProducts: JSON.parse(
          JSON.stringify(SubCategoryNewProducts)
        ),
      });
    });
  },
};
module.exports = productController;
