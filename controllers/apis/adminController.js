const db = require("../../models");
const adminService = require("../../services/adminService");

const AdminController = {
  getCreateProduct: (req, res) => {
    adminService.getCreateProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  postCreateProduct: (req, res) => {
    adminService.postCreateProduct(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = AdminController;
