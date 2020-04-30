const bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.User;
const userService = require("../../services/userService");

// JWT
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let userController = {
  signIn: (req, res) => {
    // 檢查必要資料
    if (!req.body.email || !req.body.password) {
      return res.json({
        status: "error",
        message: "required fields didn't exist",
      });
    }
    // 檢查 user 是否存在與密碼是否正確
    let username = req.body.email;
    let password = req.body.password;

    User.findOne({ where: { email: username } }).then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ status: "error", message: "no such user found" });
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ status: "error", message: "passwords did not match" });
      }
      // 簽發 token
      var payload = { id: user.id };
      var token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.json({
        status: "success",
        message: "ok",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  },
  signUp: (req, res) => {
    if (req.body.passwordCheck !== req.body.password) {
      return res.redirect("/signup");
    } else {
      // confirm unique user
      User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user) {
          return res.redirect("/signup");
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            ),
            role: req.body.role,
          }).then((user) => {
            return res.json({ status: "success", message: "成功註冊帳號！" });
          });
        }
      });
    }
  },
  getUser: (req, res) => {
    userService.getUser(req, res, (data) => {
      return res.json(data);
    });
  },
  getCurrentUser: (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      role: req.user.role,
    });
  },
  postUser: (req, res) => {
    userService.postUser(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = userController;
