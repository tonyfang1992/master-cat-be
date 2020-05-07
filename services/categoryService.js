const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const SubCategory = db.SubCategory;
const ThisWeekActivity = db.ThisWeekActivity;
const NewActivity = db.NewActivity;
const Can = db.Can;
const CanType = db.CanType;
const Feed = db.Feed;
const FeedAge = db.FeedAge;
const FeedFunction = db.FeedFunction;

const categoryService = {
  getMenu: (req, res, callback) => {
    return ThisWeekActivity.findAll().then((ThisWeekActivities) => {
      NewActivity.findAll().then((NewActivities) => {
        Can.findAll().then((Cans) => {
          CanType.findAll().then((CanTypes) => {
            Feed.findAll().then((Feeds) => {
              FeedAge.findAll().then((FeedAges) => {
                FeedFunction.findAll().then((FeedFunctions) => {
                  callback({
                    ThisWeekActivities: JSON.parse(
                      JSON.stringify(ThisWeekActivities)
                    ),
                    NewActivities: JSON.parse(JSON.stringify(NewActivities)),
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
  },
  getCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then((category) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const CategoryProducts = Products.filter(
          (product) => product.CategoryId == req.params.id
        );

        let CategoryTopProducts = [];
        let CategoryNewProducts = [];
        CategoryTopProducts = CategoryProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        CategoryNewProducts = CategoryProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          category: JSON.parse(JSON.stringify(category)),
          CategoryTopProducts: JSON.parse(JSON.stringify(CategoryTopProducts)),
          CategoryNewProducts: JSON.parse(JSON.stringify(CategoryNewProducts)),
        });
      });
    });
  },
  getSubCategory: (req, res, callback) => {
    return SubCategory.findByPk(req.params.id).then((SubCategory) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const CategoryProducts = Products.filter(
          (product) => product.SubCategoryId == req.params.id
        );

        let SubCategoryTopProducts = [];
        let SubCategoryNewProducts = [];
        SubCategoryTopProducts = CategoryProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        SubCategoryNewProducts = CategoryProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          SubCategory: JSON.parse(JSON.stringify(SubCategory)),
          SubCategoryTopProducts: JSON.parse(
            JSON.stringify(SubCategoryTopProducts)
          ),
          SubCategoryNewProducts: JSON.parse(
            JSON.stringify(SubCategoryNewProducts)
          ),
        });
      });
    });
  },
  getThisWeekActivity: (req, res, callback) => {
    return ThisWeekActivity.findByPk(req.params.id).then((ThisWeekActivity) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const ThisWeekActivityProducts = Products.filter(
          (product) => product.ThisWeekActivityId == req.params.id
        );

        let ThisWeekActivityTopProducts = [];
        let ThisWeekActivityNewProducts = [];
        ThisWeekActivityTopProducts = ThisWeekActivityProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        ThisWeekActivityNewProducts = ThisWeekActivityProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          ThisWeekActivity: JSON.parse(JSON.stringify(ThisWeekActivity)),
          ThisWeekActivityTopProducts: JSON.parse(
            JSON.stringify(ThisWeekActivityTopProducts)
          ),
          ThisWeekActivityNewProducts: JSON.parse(
            JSON.stringify(ThisWeekActivityNewProducts)
          ),
        });
      });
    });
  },
  getNewActivity: (req, res, callback) => {
    return NewActivity.findByPk(req.params.id).then((NewActivity) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const NewActivityProducts = Products.filter(
          (product) => product.NewActivityId == req.params.id
        );

        let NewActivityTopProducts = [];
        let NewActivityNewProducts = [];
        NewActivityTopProducts = NewActivityProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        NewActivityNewProducts = NewActivityProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          NewActivity: JSON.parse(JSON.stringify(NewActivity)),
          NewActivityTopProducts: JSON.parse(
            JSON.stringify(NewActivityTopProducts)
          ),
          NewActivityNewProducts: JSON.parse(
            JSON.stringify(NewActivityNewProducts)
          ),
        });
      });
    });
  },
  getFeed: (req, res, callback) => {
    return Feed.findByPk(req.params.id).then((Feed) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const FeedProducts = Products.filter(
          (product) => product.FeedId == req.params.id
        );

        let FeedTopProducts = [];
        let FeedNewProducts = [];
        FeedTopProducts = FeedProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        FeedNewProducts = FeedProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          Feed,
          FeedTopProducts,
          FeedNewProducts,
        });
      });
    });
  },
  getFeedAge: (req, res, callback) => {
    return FeedAge.findByPk(req.params.id).then((FeedAge) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const FeedAgeProducts = Products.filter(
          (product) => product.FeedAgeId == req.params.id
        );

        let FeedAgeTopProducts = [];
        let FeedAgeNewProducts = [];
        FeedAgeTopProducts = FeedAgeProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        FeedAgeNewProducts = FeedAgeProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          FeedAge,
          FeedAgeTopProducts,
          FeedAgeNewProducts,
        });
      });
    });
  },
  getFeedFunction: (req, res, callback) => {
    return FeedFunction.findByPk(req.params.id).then((FeedFunction) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const FeedFunctionProducts = Products.filter(
          (product) => product.FeedFunctionId == req.params.id
        );

        let FeedFunctionTopProducts = [];
        let FeedFunctionNewProducts = [];
        FeedFunctionTopProducts = FeedFunctionProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        FeedFunctionNewProducts = FeedFunctionProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          FeedFunction,
          FeedFunctionTopProducts,
          FeedFunctionNewProducts,
        });
      });
    });
  },
  getCan: (req, res, callback) => {
    return Can.findByPk(req.params.id).then((Can) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const CanProducts = Products.filter(
          (product) => product.CanId == req.params.id
        );

        let CanTopProducts = [];
        let CanNewProducts = [];
        CanTopProducts = CanProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        CanNewProducts = CanProducts.sort((a, b) => a.updatedAt - b.updatedAt);

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          Can,
          CanTopProducts,
          CanNewProducts,
        });
      });
    });
  },
  getCanType: (req, res, callback) => {
    return CanType.findByPk(req.params.id).then((CanType) => {
      Product.findAll({ where: { launched: true } }).then((Products) => {
        const CanTypeProducts = Products.filter(
          (product) => product.CanTypeId == req.params.id
        );

        let CanTypeTopProducts = [];
        let CanTypeNewProducts = [];
        CanTypeTopProducts = CanTypeProducts.sort(
          (a, b) => b.SaleAmount - a.SaleAmount
        );
        CanTypeNewProducts = CanTypeProducts.sort(
          (a, b) => a.updatedAt - b.updatedAt
        );

        let TopProducts = [];
        let NewProducts = [];
        TopProducts = Products.sort((a, b) => b.SaleAmount - a.SaleAmount);
        NewProducts = Products.sort((a, b) => a.updatedAt - b.updatedAt);
        callback({
          TopProducts: JSON.parse(JSON.stringify(TopProducts)),
          NewProducts: JSON.parse(JSON.stringify(NewProducts)),
          CanType,
          CanTypeTopProducts,
          CanTypeNewProducts,
        });
      });
    });
  },
};

module.exports = categoryService;
