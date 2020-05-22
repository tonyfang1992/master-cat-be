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
const FeedModel = require("../../models/feed");

describe("# Feed Model", () => {
  before((done) => {
    done();
  });

  const Feed = FeedModel(sequelize, dataTypes);
  const feed = new Feed();
  checkModelName(Feed)("Feed");

  context("properties", () => {
    ["brand", "description"].forEach(checkPropertyExists(feed));
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      Feed.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(Feed.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.Feed.create({}).then((feed) => {
        data = feed;
        done();
      });
    });
    it("read", (done) => {
      db.Feed.findByPk(data.id).then((feed) => {
        expect(data.id).to.be.equal(feed.id);
        done();
      });
    });
    it("update", (done) => {
      db.Feed.update({}, { where: { id: data.id } }).then(() => {
        db.Feed.findByPk(data.id).then((feed) => {
          expect(data.updatedAt).to.be.not.equal(feed.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.Feed.destroy({ where: { id: data.id } }).then(() => {
        db.Feed.findByPk(data.id).then((feed) => {
          expect(feed).to.be.equal(null);
          done();
        });
      });
    });
  });
});
