const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Order = db.Order;
const OrderItem = db.OrderItem;

const OrderService = {
  postOrder: (req, res, callback) => {
    return Cart.findOne({
      where: { uuid: req.body.cartId },
      include: "items",
    }).then((cart) => {
      return Order.create({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        shipping_status: 0,
        payment_status: 0,
        UserId: req.body.userId,
        amount: 1,
      }).then((order) => {
        var results = [];
        for (var i = 0; i < cart.items.length; i++) {
          results.push(
            OrderItem.create({
              OrderId: order.id,
              ProductId: cart.items[i].id,
              price: cart.items[i].price,
              quantity: cart.items[i].CartItem.quantity,
            })
          );
        }

        return Promise.all(results).then(() =>
          callback({ status: "success", message: "成功建立訂單" })
        );
      });
    });
  },
};

module.exports = OrderService;
