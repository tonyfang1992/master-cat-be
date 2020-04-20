const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const ThisWeekActivity = db.ThisWeekActivity;
const NewActivity = db.NewActivity;

const categoryController = {
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
};

module.exports = categoryController;
