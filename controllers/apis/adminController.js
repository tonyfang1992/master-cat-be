const db = require("../../models");
const adminService = require("../../services/adminService");

const AdminController = {
  getCreateProduct: (req, res) => {
    adminService.getCreateProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  getEditProduct: (req, res) => {
    adminService.getEditProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  getEditThisWeekActivity: (req, res) => {
    adminService.getEditThisWeekActivity(req, res, (data) => {
      return res.json(data);
    });
  },
  getStore: (req, res) => {
    adminService.getStore(req, res, (data) => {
      return res.json(data);
    });
  },
  getActivities: (req, res) => {
    adminService.getActivities(req, res, (data) => {
      return res.json(data);
    });
  },
  postNewProduct: (req, res) => {
    adminService.postNewProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  putEditProduct: (req, res) => {
    adminService.putEditProduct(req, res, (data) => {
      return res.json(data);
    });
  },
  putEditThisWeekActivity: (req, res) => {
    adminService.putEditThisWeekActivity(req, res, (data) => {
      return res.json(data);
    });
  },
  putProductLaunched: (req, res) => {
    adminService.putProductLaunched(req, res, (data) => {
      return res.json(data);
    });
  },
  postNewActivity: (req, res) => {
    adminService.postNewActivity(req, res, (data) => {
      return res.json(data);
    });
  },
  postFeedorCan: (req, res) => {
    adminService.postFeedorCan(req, res, (data) => {
      return res.json(data);
    });
  },
  getOrders: (req, res) => {
    adminService.getOrders(req, res, (data) => {
      return res.json(data);
    });
  },
  getUsers: (req, res) => {
    adminService.getUsers(req, res, (data) => {
      return res.json(data);
    });
  },
  deleteOrder: (req, res) => {
    adminService.deleteOrder(req, res, (data) => {
      return res.json(data);
    });
  },
  deleteUser: (req, res) => {
    adminService.deleteUser(req, res, (data) => {
      return res.json(data);
    });
  },
};

module.exports = AdminController;
