const db = require("../models");
const User = db.User;
const Cat = db.Cat;

const userService = {
  getUser: (req, res, callback) => {
    if (Number(req.user.id) === Number(req.params.id)) {
      return User.findByPk(req.params.id, { include: [Cat] }).then((user) => {
        callback({ user });
      });
    } else {
      return User.findByPk(req.user.id, { include: [Cat] }).then((user) => {
        callback({ user });
      });
    }
  },
  postUser: (req, res, callback) => {
    if (
      req.body.name.length == 0 ||
      req.body.address.length == 0 ||
      req.body.phone.length == 0
    ) {
      return callback({ status: "error", message: "所有欄位都是必填" });
    }
    if (isNaN(req.body.phone) || req.body.phone.length !== 10) {
      return callback({
        status: "error",
        message: "電話欄只能輸入長度為10的數字!",
      });
    }
    return User.findByPk(req.user.id).then((user) => {
      user.update({
        ...user,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      });
      return callback({ status: "success", message: "成功修改使用者資料" });
    });
  },
};

module.exports = userService;
