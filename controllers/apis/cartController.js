const db = require("../../models");
const cartService = require("../../services/cartService");

const CartController = {
  getCart: (req, res) => {
    cartService.getCart(req, res, (data) => {
      return res.json(data);
    });
  },
  getCheckoutCart: (req, res) => {
    cartService.getCheckoutCart(req, res, (data) => {
      return res.json(data);
    });
  },
  postCart: (req, res) => {
    cartService.postCart(req, res, (data) => {
      return res.json(data);
    });
  },
  addCartItem: (req, res) => {
    cartService.addCartItem(req, res, (data) => {
      return res.json(data);
    });
  },
  subCartItem: (req, res) => {
    cartService.subCartItem(req, res, (data) => {
      return res.json(data);
    });
  },
  deleteCartItem: (req, res) => {
    cartService.deleteCartItem(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = CartController;
