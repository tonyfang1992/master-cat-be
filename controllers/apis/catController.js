const db = require("../../models");
const catService = require("../../services/catService");
const catController = {
  getCat: (req, res) => {
    catService.getCat(req, res, (data) => {
      return res.json(data);
    });
  },
  postCat: (req, res) => {
    catService.postCat(req, res, (data) => {
      return res.json(data);
    });
  },
  putCat: (req, res) => {
    catService.putCat(req, res, (data) => {
      return res.json(data);
    });
  },
};
module.exports = catController;
