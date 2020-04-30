const db = require("../models");
const Category = db.Category;
const SubCategory = db.SubCategory;
const ThisWeekActivity = db.ThisWeekActivity;
const NewActivity = db.NewActivity;
const Product = db.Product;
const Can = db.Can;
const CanType = db.CanType;
const Feed = db.Feed;
const FeedAge = db.FeedAge;
const FeedFunction = db.FeedFunction;
const Order = db.Order;
const User = db.User;

const imgur = require("imgur-node-api");
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

const AdminService = {
  getCreateProduct: (req, res, callback) => {
    return Category.findAll().then((Categories) => {
      SubCategory.findAll().then((SubCategories) => {
        ThisWeekActivity.findAll().then((ThisWeekActivities) => {
          NewActivity.findAll().then((NewActivities) => {
            Can.findAll().then((Cans) => {
              CanType.findAll().then((CanTypes) => {
                Feed.findAll().then((Feeds) => {
                  FeedAge.findAll().then((FeedAges) => {
                    FeedFunction.findAll().then((FeedFunctions) => {
                      return callback({
                        Categories,
                        SubCategories,
                        ThisWeekActivities,
                        NewActivities,
                        Cans,
                        CanTypes,
                        Feeds,
                        FeedAges,
                        FeedFunctions,
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  },
  getEditProduct: (req, res, callback) => {
    return Category.findAll().then((Categories) => {
      SubCategory.findAll().then((SubCategories) => {
        ThisWeekActivity.findAll().then((ThisWeekActivities) => {
          NewActivity.findAll().then((NewActivities) => {
            Can.findAll().then((Cans) => {
              CanType.findAll().then((CanTypes) => {
                Feed.findAll().then((Feeds) => {
                  FeedAge.findAll().then((FeedAges) => {
                    FeedFunction.findAll().then((FeedFunctions) => {
                      Product.findByPk(req.params.id).then((product) => {
                        return callback({
                          Categories,
                          SubCategories,
                          ThisWeekActivities,
                          NewActivities,
                          Cans,
                          CanTypes,
                          Feeds,
                          FeedAges,
                          FeedFunctions,
                          product,
                        });
                      });
                    });
                  });
                });
              });
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
      !req.body.Category
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
  putEditProduct: (req, res, callback) => {
    const { file } = req;

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Product.findByPk(req.params.id)
          .then((product) => {
            product.update({
              name: req.body.name,
              description: req.body.description,
              amount: req.body.amount,
              specification: req.body.specification,
              detail: req.body.detail,
              price: req.body.price,
              image: file ? img.data.link : null,
              CanId: req.body.CanId,
              CanTypeId: req.body.CanTypeId,
              FeedId: req.body.FeedId,
              FeedAgeId: req.body.FeedAgeId,
              FeedFunctionId: req.body.FeedFunctionId,
              CategoryId: req.body.Category,
              SubcategoryId: req.body.SubCategory,
              ThisWeekActivityId: req.body.ThisWeekActivity,
              NewActivityId: req.body.NewActivity,
            });
          })
          .then((product) => {
            callback({
              status: "success",
              message: "成功修改產品",
            });
          });
      });
    } else {
      return Product.findByPk(req.params.id)
        .then((product) => {
          console.log(req.body);
          console.log(req.body.name);
          product.update({
            name: req.body.name,
            detail: req.body.detail,
            description: req.body.description,
            amount: req.body.amount,
            specification: req.body.specification,
            price: req.body.price,
            CanId: req.body.CanId,
            CanTypeId: req.body.CanTypeId,
            FeedId: req.body.FeedId,
            FeedAgeId: req.body.FeedAgeId,
            FeedFunctionId: req.body.FeedFunctionId,
            CategoryId: req.body.Category,
            SubcategoryId: req.body.SubCategory,
            ThisWeekActivityId: req.body.ThisWeekActivity,
            NewActivityId: req.body.NewActivity,
          });
        })
        .then((product) => {
          callback({
            status: "success",
            message: "成功修改產品",
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
  postFeedorCan: (req, res, callback) => {
    console.log(req.body);
    if (!req.body.name || !req.body.description || !req.body.FeedorCan) {
      return callback({ status: "error", message: "表格皆須填滿" });
    }
    if (req.body.FeedorCan == 1) {
      return Feed.create({
        brand: req.body.name,
        description: req.body.description,
      }).then((can) => {
        callback({
          status: "success",
          message: "成功新增飼料 (年齡品種)",
        });
      });
    }
    if (req.body.FeedorCan == 2) {
      return FeedAge.create({
        age: req.body.name,
        description: req.body.description,
      }).then((can) => {
        callback({
          status: "success",
          message: "成功新增飼料 (年齡品種)",
        });
      });
    }

    if (req.body.FeedorCan == 3) {
      return FeedFunction.create({
        function: req.body.name,
        description: req.body.description,
      }).then((canType) => {
        callback({
          status: "success",
          message: "成功新增飼料 (依功能性)",
        });
      });
    }

    if (req.body.FeedorCan == 4) {
      return Can.create({
        brand: req.body.name,
        description: req.body.description,
      }).then((can) => {
        callback({
          status: "success",
          message: "成功新增罐頭(品牌)",
        });
      });
    }

    if (req.body.FeedorCan == 5) {
      return CanType.create({
        type: req.body.name,
        description: req.body.description,
      }).then((canType) => {
        callback({
          status: "success",
          message: "成功新增喵喵主 / 副食罐",
        });
      });
    }
  },
  getStore: (req, res, callback) => {
    return Product.findAll({
      attributes: ["id", "SubcategoryId", "name", "amount", "SaleAmount"],
    }).then((products) => {
      callback({ products });
    });
  },
  getOrders: (req, res, callback) => {
    Order.findAll().then((orders) => {
      return callback({ orders });
    });
  },
  getUsers: (req, res, callback) => {
    User.findAll().then((users) => {
      return callback({ users });
    });
  },
  deleteOrder: (req, res, callback) => {
    Order.findByPk(req.params.id).then((order) => {
      order
        .destroy()
        .then(() => callback({ status: "success", message: "成功刪除訂單" }));
    });
  },
  deleteUser: (req, res, callback) => {
    User.findByPk(req.params.id).then((user) => {
      user
        .destroy()
        .then(() => callback({ status: "success", message: "成功刪除訂單" }));
    });
  },
};

module.exports = AdminService;
