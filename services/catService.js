const db = require("../models");
const Cat = db.Cat;

const catService = {
  postCat: (req, res, callback) => {
    Cat.create({
      name: req.body.name,
      gender: req.body.gender,
      UserId: req.body.UserId,
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
