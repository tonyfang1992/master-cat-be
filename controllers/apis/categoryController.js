const db = require("../../models");
const Product = db.Product;
const Category = db.Category;
const categoryService = require("../../services/categoryService");

const categoryController = {
  getMenu: (req, res) => {
    categoryService.getMenu(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = categoryController;
