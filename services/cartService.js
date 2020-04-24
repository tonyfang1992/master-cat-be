const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;

const CartService = {
  getCart: (req, res, callback) => {
    console.log(req.params.id);
    return Cart.findOne({
      where: { uuid: req.params.id },
      include: "items",
    }).then((cart) => {
      cart = cart || { items: [] };
      let totalPrice =
        cart.items.length > 0
          ? cart.items
              .map((d) => d.price * d.CartItem.quantity)
              .reduce((a, b) => a + b)
          : 0;
      return callback({
        cart,
        totalPrice,
      });
    });
  },
  postCart: (req, res, callback) => {
    return Cart.findOrCreate({
      where: {
        uuid: req.body.cartId || 0,
      },
    }).spread(function (cart, created) {
      return CartItem.findOrCreate({
        where: {
          CartId: cart.id,
          ProductId: req.body.productId,
        },
        default: {
          CartId: cart.id,
          ProductId: req.body.productId,
        },
      }).spread(function (cartItem, created) {
        return cartItem
          .update({
            quantity: (cartItem.quantity || 0) + 1,
          })
          .then((cartItem) => {
            return callback({
              status: "success",
              message: "成功加入購物車！",
            });
          });
      });
    });
  },
  addCartItem: (req, res, callback) => {
    CartItem.findByPk(req.params.id).then((cartItem) => {
      cartItem
        .update({
          quantity: cartItem.quantity + 1,
        })
        .then((cartItem) => {
          return callback({
            status: "success",
            message: "成功修改購物車內容！",
          });
        });
    });
  },
  subCartItem: (req, res, callback) => {
    CartItem.findByPk(req.params.id).then((cartItem) => {
      cartItem
        .update({
          quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1,
        })
        .then((cartItem) => {
          return callback({
            status: "success",
            message: "成功修改購物車內容！",
          });
        });
    });
  },
  deleteCartItem: (req, res, callback) => {
    CartItem.findByPk(req.params.id).then((cartItem) => {
      cartItem.destroy().then((cartItem) => {
        return callback({ status: "success", message: "成功刪除購物車內商品" });
      });
    });
  },
};

module.exports = CartService;
