const db = require("../../models");
const cartService = require("../../services/cartService");

const CartController = {
  getCart: (req, res) => {
    cartService.getCart(req, res, (data) => {
      return res.json(data);
    });
  },
  postCart: (req, res) => {
    cartService.postCart(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = CartController;
