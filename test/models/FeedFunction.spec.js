process.env.NODE_ENV = "test";

var chai = require("chai");
var sinon = require("sinon");
chai.use(require("sinon-chai"));

const { expect } = require("chai");
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require("sequelize-test-helpers");

const db = require("../../models");
const FeedFunctionModel = require("../../models/feedfunction");

describe("# FeedFunction Model", () => {
  before((done) => {
    done();
  });

  const FeedFunction = FeedFunctionModel(sequelize, dataTypes);
  const feedage = new FeedFunction();
  checkModelName(FeedFunction)("FeedFunction");

  context("properties", () => {
    ["function", "description"].forEach(checkPropertyExists(feedage));
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      FeedFunction.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(FeedFunction.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.FeedFunction.create({}).then((feedfunction) => {
        data = feedfunction;
        done();
      });
    });
    it("read", (done) => {
      db.FeedFunction.findByPk(data.id).then((feedfunction) => {
        expect(data.id).to.be.equal(feedfunction.id);
        done();
      });
    });
    it("update", (done) => {
      db.FeedFunction.update({}, { where: { id: data.id } }).then(() => {
        db.FeedFunction.findByPk(data.id).then((feedfunction) => {
          expect(data.updatedAt).to.be.not.equal(feedfunction.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.FeedFunction.destroy({ where: { id: data.id } }).then(() => {
        db.FeedFunction.findByPk(data.id).then((feedfunction) => {
          expect(feedfunction).to.be.equal(null);
          done();
        });
      });
    });
  });
});
