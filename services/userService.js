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
      return User.findByPk(req.user.id).then((user) => {
        callback({ user });
      });
    }
  },
};

module.exports = userService;
