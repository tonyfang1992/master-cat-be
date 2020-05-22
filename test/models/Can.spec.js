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
const CanModel = require("../../models/can");

describe("# Can Model", () => {
  before((done) => {
    done();
  });

  const Can = CanModel(sequelize, dataTypes);
  const can = new Can();
  checkModelName(Can)("Can");

  context("properties", () => {
    ["brand", "description"].forEach(checkPropertyExists(can));
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      Can.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(Can.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.Can.create({}).then((can) => {
        data = can;
        done();
      });
    });
    it("read", (done) => {
      db.Can.findByPk(data.id).then((can) => {
        expect(data.id).to.be.equal(can.id);
        done();
      });
    });
    it("update", (done) => {
      db.Can.update({}, { where: { id: data.id } }).then(() => {
        db.Can.findByPk(data.id).then((can) => {
          expect(data.updatedAt).to.be.not.equal(can.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.Can.destroy({ where: { id: data.id } }).then(() => {
        db.Can.findByPk(data.id).then((can) => {
          expect(can).to.be.equal(null);
          done();
        });
      });
    });
  });
});
