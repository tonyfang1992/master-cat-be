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
const CanTypeModel = require("../../models/cantype");

describe("# CanType Model", () => {
  before((done) => {
    done();
  });

  const CanType = CanTypeModel(sequelize, dataTypes);
  const cantype = new CanType();
  checkModelName(CanType)("CanType");

  context("properties", () => {
    ["type", "description"].forEach(checkPropertyExists(cantype));
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      CanType.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(CanType.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.CanType.create({}).then((cantype) => {
        data = cantype;
        done();
      });
    });
    it("read", (done) => {
      db.CanType.findByPk(data.id).then((cantype) => {
        expect(data.id).to.be.equal(cantype.id);
        done();
      });
    });
    it("update", (done) => {
      db.CanType.update({}, { where: { id: data.id } }).then(() => {
        db.CanType.findByPk(data.id).then((cantype) => {
          expect(data.updatedAt).to.be.not.equal(cantype.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.CanType.destroy({ where: { id: data.id } }).then(() => {
        db.CanType.findByPk(data.id).then((cantype) => {
          expect(cantype).to.be.equal(null);
          done();
        });
      });
    });
  });
});
