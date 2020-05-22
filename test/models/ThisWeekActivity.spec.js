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
const ThisWeekActivityModel = require("../../models/thisweekactivity");

describe("# ThisWeekActivity Model", () => {
  before((done) => {
    done();
  });

  const ThisWeekActivity = ThisWeekActivityModel(sequelize, dataTypes);
  const thisweekactivity = new ThisWeekActivity();
  checkModelName(ThisWeekActivity)("ThisWeekActivity");

  context("properties", () => {
    ["name", "description", "image", "discount"].forEach(
      checkPropertyExists(thisweekactivity)
    );
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      ThisWeekActivity.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(ThisWeekActivity.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.ThisWeekActivity.create({}).then((thisweekactivity) => {
        data = thisweekactivity;
        done();
      });
    });
    it("read", (done) => {
      db.ThisWeekActivity.findByPk(data.id).then((thisweekactivity) => {
        expect(data.id).to.be.equal(thisweekactivity.id);
        done();
      });
    });
    it("update", (done) => {
      db.ThisWeekActivity.update({}, { where: { id: data.id } }).then(() => {
        db.ThisWeekActivity.findByPk(data.id).then((thisweekactivity) => {
          expect(data.updatedAt).to.be.not.equal(thisweekactivity.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.ThisWeekActivity.destroy({ where: { id: data.id } }).then(() => {
        db.ThisWeekActivity.findByPk(data.id).then((thisweekactivity) => {
          expect(thisweekactivity).to.be.equal(null);
          done();
        });
      });
    });
  });
});
