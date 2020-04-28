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
  getCategory: (req, res) => {
    categoryService.getCategory(req, res, (data) => {
      return res.json(data);
    });
  },
  getSubCategory: (req, res) => {
    categoryService.getSubCategory(req, res, (data) => {
      return res.json(data);
    });
  },
  getThisWeekActivity: (req, res) => {
    categoryService.getThisWeekActivity(req, res, (data) => {
      return res.json(data);
    });
  },
  getNewActivity: (req, res) => {
    categoryService.getNewActivity(req, res, (data) => {
      return res.json(data);
    });
  },
  getFeed: (req, res) => {
    categoryService.getFeed(req, res, (data) => {
      return res.json(data);
    });
  },
  getFeedAge: (req, res) => {
    categoryService.getFeedAge(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = categoryController;
