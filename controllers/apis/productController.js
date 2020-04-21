const db = require("../../models");
const Product = db.Product;
const Category = db.Category;
const productService = require("../../services/productService");
const productController = {
  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
      return res.json(data);
    });
  },
  getProduct: (req, res) => {
    productService.getProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  getTopProducts: (req, res) => {
    productService.getTopProducts(req, res, (data) => {
      return res.json(data);
    });
  },
  getNewProducts: (req, res) => {
    productService.getNewProducts(req, res, (data) => {
      return res.json(data);
    });
  },
  getHotProducts: (req, res) => {
    productService.getHotProducts(req, res, (data) => {
      return res.json(data);
    });
  },
};
module.exports = productController;
