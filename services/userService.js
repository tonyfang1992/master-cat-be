const db = require("../models");
const User = db.User;
const Cat = db.Cat;

const userService = {
  getUser: (req, res, callback) => {
    return User.findByPk(req.params.id, { include: [Cat] }).then((user) => {
      callback({ user: user });
    });
  },
};

module.exports = userService;
