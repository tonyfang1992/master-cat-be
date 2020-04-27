const db = require("../models");
const Category = db.Category;
const SubCategory = db.SubCategory;
const ThisWeekActivity = db.ThisWeekActivity;
const NewActivity = db.NewActivity;
const Product = db.Product;

const imgur = require("imgur-node-api");
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

const AdminService = {
  getCreateProduct: (req, res, callback) => {
    return Category.findAll().then((Categories) => {
      SubCategory.findAll().then((SubCategories) => {
        ThisWeekActivity.findAll().then((ThisWeekActivities) => {
          NewActivity.findAll().then((NewActivities) => {
            return callback({
              Categories,
              SubCategories,
              ThisWeekActivities,
              NewActivities,
            });
          });
        });
      });
    });
  },
  postNewProduct: (req, res, callback) => {
    const { file } = req;
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.amount ||
      !req.body.specification ||
      !req.body.price ||
      !req.body.detail ||
      !req.body.Category ||
      !req.body.SubCategory
    ) {
      return callback({ status: "error", message: "表格皆須填滿" });
    }

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Product.create({
          name: req.body.name,
          description: req.body.description,
          amount: req.body.amount,
          specification: req.body.specification,
          detail: req.body.detail,
          price: req.body.price,
          image: file ? img.data.link : null,
          CategoryId: req.body.Category,
          SubcategoryId: req.body.SubCategory,
          ThisWeekActivityId: req.body.ThisWeekActivity,
          NewActivityId: req.body.NewActivity,
        }).then((product) => {
          callback({
            status: "success",
            message: "成功新增產品",
          });
        });
      });
    } else {
      return Product.create({
        name: req.body.name,
        detail: req.body.detail,
        description: req.body.description,
        amount: req.body.amount,
        specification: req.body.specification,
        price: req.body.price,
        CategoryId: req.body.Category,
        SubcategoryId: req.body.SubCategory,
        ThisWeekActivityId: req.body.ThisWeekActivity,
        NewActivityId: req.body.NewActivity,
        image: null,
      }).then((product) => {
        callback({
          status: "success",
          message: "成功新增產品",
        });
      });
    }
  },
  postNewActivity: (req, res, callback) => {
    const { file } = req;
    if (!req.body.name || !req.body.description || !req.body.Activity) {
      return callback({ status: "error", message: "表格皆須填滿" });
    }
    if (req.body.Activity == 1) {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID);
        imgur.upload(file.path, (err, img) => {
          return ThisWeekActivity.create({
            name: req.body.name,
            description: req.body.description,
            discount: req.body.discount || null,
            image: file ? img.data.link : null,
          }).then((activity) => {
            callback({
              status: "success",
              message: "成功新增產品",
            });
          });
        });
      } else {
        return ThisWeekActivity.create({
          name: req.body.name,
          description: req.body.description,
          discount: req.body.discount || null,
          image: null,
        }).then((activity) => {
          callback({
            status: "success",
            message: "成功新增產品",
          });
        });
      }
    }
    if (req.body.Activity == 2) {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID);
        imgur.upload(file.path, (err, img) => {
          return NewActivity.create({
            name: req.body.name,
            description: req.body.description,
            discount: req.body.discount || null,
            image: file ? img.data.link : null,
          }).then((activity) => {
            callback({
              status: "success",
              message: "成功新增產品",
            });
          });
        });
      } else {
        return NewActivity.create({
          name: req.body.name,
          description: req.body.description,
          discount: req.body.discount || null,
          image: null,
        }).then((activity) => {
          callback({
            status: "success",
            message: "成功新增產品",
          });
        });
      }
    }
  },
  getStore: (req, res, callback) => {
    return Product.findAll({
      attributes: ["id", "SubcategoryId", "name", "amount", "SaleAmount"],
    }).then((products) => {
      callback({ products });
    });
  },
};

module.exports = AdminService;
