const db = require("../../models");
const adminService = require("../../services/adminService");

const AdminController = {
  getCreateProduct: (req, res) => {
    adminService.getCreateProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  postNewProduct: (req, res) => {
    adminService.postNewProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  postNewActivity: (req, res) => {
    adminService.postNewActivity(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = AdminController;
