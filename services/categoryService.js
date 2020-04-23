const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const SubCategory = db.SubCategory;
const ThisWeekActivity = db.ThisWeekActivity;
const NewActivity = db.NewActivity;

const categoryService = {
  getMenu: (req, res, callback) => {
    return ThisWeekActivity.findAll().then((ThisWeekActivities) => {
      NewActivity.findAll().then((NewActivities) => {
        callback({
          ThisWeekActivities: JSON.parse(JSON.stringify(ThisWeekActivities)),
          NewActivities: JSON.parse(JSON.stringify(NewActivities)),
        });
      });
    });
  },
  getCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then((category) => {
      Product.findAll({}).then((Products) => {
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
      Product.findAll({}).then((Products) => {
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
      Product.findAll({}).then((Products) => {
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
      Product.findAll({}).then((Products) => {
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
};

module.exports = categoryService;
