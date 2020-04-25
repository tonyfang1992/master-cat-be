const db = require("../../models");
const orderService = require("../../services/orderService");

const OrderController = {
  postOrder: (req, res) => {
    orderService.postOrder(req, res, (data) => {
      return res.json(data);
    });
  },
  getOrders: (req, res) => {
    orderService.getOrders(req, res, (data) => {
      return res.json(data);
    });
  },
  cancelOrder: (req, res) => {
    orderService.cancelOrder(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = OrderController;
