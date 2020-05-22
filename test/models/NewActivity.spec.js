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
const NewActivityModel = require("../../models/newactivity");

describe("# NewActivity Model", () => {
  before((done) => {
    done();
  });

  const NewActivity = NewActivityModel(sequelize, dataTypes);
  const newactivity = new NewActivity();
  checkModelName(NewActivity)("NewActivity");

  context("properties", () => {
    ["name", "description", "image", "discount"].forEach(
      checkPropertyExists(newactivity)
    );
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      NewActivity.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(NewActivity.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.NewActivity.create({}).then((newactivity) => {
        data = newactivity;
        done();
      });
    });
    it("read", (done) => {
      db.NewActivity.findByPk(data.id).then((newactivity) => {
        expect(data.id).to.be.equal(newactivity.id);
        done();
      });
    });
    it("update", (done) => {
      db.NewActivity.update({}, { where: { id: data.id } }).then(() => {
        db.NewActivity.findByPk(data.id).then((newactivity) => {
          expect(data.updatedAt).to.be.not.equal(newactivity.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.NewActivity.destroy({ where: { id: data.id } }).then(() => {
        db.NewActivity.findByPk(data.id).then((newactivity) => {
          expect(newactivity).to.be.equal(null);
          done();
        });
      });
    });
  });
});
