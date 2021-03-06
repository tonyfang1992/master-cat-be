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
    let Categories = {};
    let SubCategories = {};
    let ThisWeekActivities = {};
    let NewActivities = {};
    let Cans = {};
    let CanTypes = {};
    let Feeds = {};
    let FeedAges = {};
    let FeedFunctions = {};
    let getCategory = new Promise((resolve, reject) => {
      Category.findAll().then((resultCategories) => {
        Categories = resultCategories;
        return resolve(Categories);
      });
    });
    let getSubCategory = new Promise((resolve, reject) => {
      SubCategory.findAll().then((resultSubCategories) => {
        SubCategories = resultSubCategories;
        return resolve(SubCategories);
      });
    });
    let getThisWeekActivity = new Promise((resolve, reject) => {
      ThisWeekActivity.findAll().then((resultThisWeekActivities) => {
        ThisWeekActivities = resultThisWeekActivities;
        return resolve(ThisWeekActivities);
      });
    });
    let getNewActivity = new Promise((resolve, reject) => {
      NewActivity.findAll().then((resultNewActivities) => {
        NewActivities = resultNewActivities;
        return resolve(NewActivities);
      });
    });
    let getCan = new Promise((resolve, reject) => {
      Can.findAll().then((resultCans) => {
        Cans = resultCans;
        return resolve(Cans);
      });
    });
    let getCanType = new Promise((resolve, reject) => {
      CanType.findAll().then((resultCanTypes) => {
        CanTypes = resultCanTypes;
        return resolve(CanTypes);
      });
    });
    let getFeed = new Promise((resolve, reject) => {
      Feed.findAll().then((resultFeeds) => {
        Feeds = resultFeeds;
        return resolve(Feeds);
      });
    });
    let getFeedAge = new Promise((resolve, reject) => {
      FeedAge.findAll().then((resultFeedAges) => {
        FeedAges = resultFeedAges;
        return resolve(FeedAges);
      });
    });
    let getFeedFunction = new Promise((resolve, reject) => {
      FeedFunction.findAll().then((resultFeedFunctions) => {
        FeedFunctions = resultFeedFunctions;
        return resolve(FeedFunctions);
      });
    });
    Promise.all([
      getCategory,
      getSubCategory,
      getThisWeekActivity,
      getNewActivity,
      getCan,
      getCanType,
      getFeed,
      getFeedAge,
      getFeedFunction,
    ]).then((result) => {
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
  },
  getEditProduct: (req, res, callback) => {
    let Categories = {};
    let SubCategories = {};
    let ThisWeekActivities = {};
    let NewActivities = {};
    let Cans = {};
    let CanTypes = {};
    let Feeds = {};
    let FeedAges = {};
    let FeedFunctions = {};
    let product = {};
    let getCategory = new Promise((resolve, reject) => {
      Category.findAll().then((resultCategories) => {
        Categories = resultCategories;
        return resolve(Categories);
      });
    });
    let getSubCategory = new Promise((resolve, reject) => {
      SubCategory.findAll().then((resultSubCategories) => {
        SubCategories = resultSubCategories;
        return resolve(SubCategories);
      });
    });
    let getThisWeekActivity = new Promise((resolve, reject) => {
      ThisWeekActivity.findAll().then((resultThisWeekActivities) => {
        ThisWeekActivities = resultThisWeekActivities;
        return resolve(ThisWeekActivities);
      });
    });
    let getNewActivity = new Promise((resolve, reject) => {
      NewActivity.findAll().then((resultNewActivities) => {
        NewActivities = resultNewActivities;
        return resolve(NewActivities);
      });
    });
    let getCan = new Promise((resolve, reject) => {
      Can.findAll().then((resultCans) => {
        Cans = resultCans;
        return resolve(Cans);
      });
    });
    let getCanType = new Promise((resolve, reject) => {
      CanType.findAll().then((resultCanTypes) => {
        CanTypes = resultCanTypes;
        return resolve(CanTypes);
      });
    });
    let getFeed = new Promise((resolve, reject) => {
      Feed.findAll().then((resultFeeds) => {
        Feeds = resultFeeds;
        return resolve(Feeds);
      });
    });
    let getFeedAge = new Promise((resolve, reject) => {
      FeedAge.findAll().then((resultFeedAges) => {
        FeedAges = resultFeedAges;
        return resolve(FeedAges);
      });
    });
    let getFeedFunction = new Promise((resolve, reject) => {
      FeedFunction.findAll().then((resultFeedFunctions) => {
        FeedFunctions = resultFeedFunctions;
        return resolve(FeedFunctions);
      });
    });
    let getProduct = new Promise((resolve, reject) => {
      Product.findByPk(req.params.id).then((resultProduct) => {
        product = resultProduct;
        return resolve(product);
      });
    });
    Promise.all([
      getCategory,
      getSubCategory,
      getThisWeekActivity,
      getNewActivity,
      getCan,
      getCanType,
      getFeed,
      getFeedAge,
      getFeedFunction,
      getProduct,
    ]).then((result) => {
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
  },
  getEditThisWeekActivity: (req, res, callback) => {
    return ThisWeekActivity.findByPk(req.params.id).then((ThisWeekActivity) => {
      return callback({
        ThisWeekActivity,
      });
    });
  },
  getEditNewActivity: (req, res, callback) => {
    return NewActivity.findByPk(req.params.id).then((NewActivity) => {
      return callback({
        NewActivity,
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
          launched: req.body.launched,
          CanId: req.body.Can,
          CanTypeId: req.body.CanType,
          FeedId: req.body.Feed,
          FeedAgeId: req.body.FeedAge,
          FeedFunctionId: req.body.FeedFunction,
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
      console.log(req.body);
      return Product.create({
        name: req.body.name,
        detail: req.body.detail,
        description: req.body.description,
        amount: req.body.amount,
        specification: req.body.specification,
        price: req.body.price,
        launched: req.body.launched,
        CanId: req.body.Can,
        CanTypeId: req.body.CanType,
        FeedId: req.body.Feed,
        FeedAgeId: req.body.FeedAge,
        FeedFunctionId: req.body.FeedFunction,
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
              launched: req.body.launched,
              CanId: req.body.Can,
              CanTypeId: req.body.CanType,
              FeedId: req.body.Feed,
              FeedAgeId: req.body.FeedAge,
              FeedFunctionId: req.body.FeedFunction,
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
            launched: req.body.launched,
            CanId: req.body.Can,
            CanTypeId: req.body.CanType,
            FeedId: req.body.Feed,
            FeedAgeId: req.body.FeedAge,
            FeedFunctionId: req.body.FeedFunction,
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
  putEditThisWeekActivity: (req, res, callback) => {
    const { file } = req;

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return ThisWeekActivity.findByPk(req.params.id)
          .then((ThisWeekActivity) => {
            ThisWeekActivity.update({
              name: req.body.name,
              description: req.body.description,
              image: file ? img.data.link : null,
            });
          })
          .then((ThisWeekActivity) => {
            callback({
              status: "success",
              message: "成功修改產品",
            });
          });
      });
    } else {
      return ThisWeekActivity.findByPk(req.params.id)
        .then((ThisWeekActivity) => {
          ThisWeekActivity.update({
            name: req.body.name,
            description: req.body.description,
          });
        })
        .then((ThisWeekActivity) => {
          callback({
            status: "success",
            message: "成功修改產品",
          });
        });
    }
  },
  putEditNewActivity: (req, res, callback) => {
    const { file } = req;

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return NewActivity.findByPk(req.params.id)
          .then((NewActivity) => {
            NewActivity.update({
              name: req.body.name,
              description: req.body.description,
              image: file ? img.data.link : null,
            });
          })
          .then((NewActivity) => {
            callback({
              status: "success",
              message: "成功修改產品",
            });
          });
      });
    } else {
      return NewActivity.findByPk(req.params.id)
        .then((NewActivity) => {
          NewActivity.update({
            name: req.body.name,
            description: req.body.description,
          });
        })
        .then((NewActivity) => {
          callback({
            status: "success",
            message: "成功修改產品",
          });
        });
    }
  },
  putProductLaunched: (req, res, callback) => {
    return Product.findByPk(req.params.id)
      .then((product) => {
        if (product.launched == true) {
          product.update({
            launched: false,
          });
        } else {
          product.update({
            launched: true,
          });
        }
      })
      .then((product) => {
        callback({
          status: "success",
          message: "成功修改產品",
        });
      });
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
    let Categories = {};
    let getCategory = new Promise((resolve, reject) => {
      Category.findAll().then((resultCategories) => {
        Categories = resultCategories;
        return resolve(Categories);
      });
    });
    getCategory.then((result) => {
      Product.findAll({
        attributes: [
          "id",
          "SubcategoryId",
          "name",
          "amount",
          "SaleAmount",
          "launched",
        ],
        where: { CategoryId: Categories[0].id },
      }).then((products) => {
        callback({ products, Categories });
      });
    });
  },
  getStoreByCategory: (req, res, callback) => {
    Product.findAll({
      attributes: [
        "id",
        "SubcategoryId",
        "name",
        "amount",
        "SaleAmount",
        "launched",
      ],
      where: { CategoryId: req.params.categoryId },
    }).then((products) => {
      callback({ products });
    });
  },
  getActivities: (req, res, callback) => {
    let activities = [];
    return ThisWeekActivity.findAll({
      attributes: ["id", "name"],
    }).then((ThisWeekActivities) => {
      NewActivity.findAll({
        attributes: ["id", "name"],
      }).then((NewActivities) => {
        activities.push(ThisWeekActivities);
        activities.push(NewActivities);
        callback({ activities });
      });
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
        .then(() => callback({ status: "success", message: "成功註銷使用者" }));
    });
  },
};

module.exports = AdminService;
