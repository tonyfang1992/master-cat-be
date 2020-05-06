const db = require("../models");
const Cat = db.Cat;

const catService = {
  getCat: (req, res, callback) => {
    Cat.findOne({ where: { UserId: req.params.id } }).then((cat) => {
      let FeedAge = [];
      let FeedFunction = [];
      if (cat == null) {
        return callback({ FeedAge, FeedFunction, cat });
      } else {
        if (cat.age < 2) {
          FeedAge.push({ id: 1, age: "幼貓飼料" });
          FeedAge.push({ id: 4, age: "全齡貓飼料" });
        }
        if (1 < cat.age && cat.age < 8) {
          if (cat.gender == "男生") {
            if (6 < cat.weight) {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
              FeedFunction.push({
                id: 1,
                function: "低卡飼料推薦",
                description: "貓咪有點過重囉!",
              });
            } else {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
            }
          } else {
            if (5 < cat.weight) {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
              FeedFunction.push({
                id: 1,
                function: "低卡飼料推薦",
                description: "貓咪有點過重囉! 若為懷孕母貓則沒關係唷。",
              });
            } else {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
            }
          }
        }
        if (7 < cat.age) {
          if (cat.gender == "男生") {
            if (6 < cat.weight) {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
              FeedFunction.push({ id: 1, function: "低卡飼料推薦" });
            } else {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedFunction.push({
                id: 2,
                function: "腸胃保健飼料推薦",
                description: "即將進入中老年，腸胃也要顧喔!",
              });
            }
          } else {
            if (5 < cat.weight) {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
              FeedFunction.push({
                id: 1,
                function: "低卡飼料推薦",
                description: "貓咪有點過重囉! 若為懷孕母貓則沒關係唷。",
              });
            } else {
              FeedAge.push({ id: 2, age: "成貓飼料" });
              FeedAge.push({ id: 4, age: "全齡貓飼料" });
              FeedFunction.push({
                id: 2,
                function: "腸胃保健飼料推薦",
                description: "即將進入中老年，腸胃也要顧喔!",
              });
            }
          }
        }
        return callback({ FeedAge, FeedFunction, cat });
      }
    });
  },
  postCat: (req, res, callback) => {
    Cat.create({
      name: req.body.name,
      gender: req.body.gender,
      UserId: req.user.id,
      age: req.body.age,
      weight: req.body.weight,
    }).then((cat) => {
      return callback({ status: "success", message: "成功登錄喵大！" });
    });
  },
  putCat: (req, res, callback) => {
    if (
      !req.body.name &&
      !req.body.gender &&
      !req.body.age &&
      !req.body.UserId &&
      !req.body.weight &&
      !req.body.CatId
    ) {
      return callback({
        status: "error",
        message: "fill all detail about cat",
      });
    }

    if (req.body.UserId !== req.user.id) {
      return callback({
        status: "error",
        message: "使用者錯誤",
      });
    }

    return Cat.findByPk(req.body.CatId).then((cat) => {
      cat
        .update({
          name: req.body.name,
          gender: req.body.gender,
          age: req.body.age,
          weight: req.body.weight,
        })
        .then((cat) => {
          return callback({ status: "success", message: "成功更新喵大！" });
        });
    });
  },
};

module.exports = catService;
