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
const FeedAgeModel = require("../../models/feedage");

describe("# FeedAge Model", () => {
  before((done) => {
    done();
  });

  const FeedAge = FeedAgeModel(sequelize, dataTypes);
  const feedage = new FeedAge();
  checkModelName(FeedAge)("FeedAge");

  context("properties", () => {
    ["age", "description"].forEach(checkPropertyExists(feedage));
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      FeedAge.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(FeedAge.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.FeedAge.create({}).then((feedage) => {
        data = feedage;
        done();
      });
    });
    it("read", (done) => {
      db.FeedAge.findByPk(data.id).then((feedage) => {
        expect(data.id).to.be.equal(feedage.id);
        done();
      });
    });
    it("update", (done) => {
      db.FeedAge.update({}, { where: { id: data.id } }).then(() => {
        db.FeedAge.findByPk(data.id).then((feedage) => {
          expect(data.updatedAt).to.be.not.equal(feedage.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.FeedAge.destroy({ where: { id: data.id } }).then(() => {
        db.FeedAge.findByPk(data.id).then((feedage) => {
          expect(feedage).to.be.equal(null);
          done();
        });
      });
    });
  });
});
