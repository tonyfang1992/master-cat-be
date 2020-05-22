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
const SubCategoryModel = require("../../models/subcategory");

describe("# SubCategory Model", () => {
  before((done) => {
    done();
  });

  const SubCategory = SubCategoryModel(sequelize, dataTypes);
  const subcategory = new SubCategory();
  checkModelName(SubCategory)("SubCategory");

  context("properties", () => {
    ["name", "description"].forEach(checkPropertyExists(subcategory));
  });

  context("associations", () => {
    const Product = "Product";

    before(() => {
      SubCategory.associate({ Product });
    });

    it("should have many product", (done) => {
      expect(SubCategory.hasMany).to.have.been.calledWith(Product);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.SubCategory.create({}).then((subcategory) => {
        data = subcategory;
        done();
      });
    });
    it("read", (done) => {
      db.SubCategory.findByPk(data.id).then((subcategory) => {
        expect(data.id).to.be.equal(subcategory.id);
        done();
      });
    });
    it("update", (done) => {
      db.SubCategory.update({}, { where: { id: data.id } }).then(() => {
        db.SubCategory.findByPk(data.id).then((subcategory) => {
          expect(data.updatedAt).to.be.not.equal(subcategory.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.SubCategory.destroy({ where: { id: data.id } }).then(() => {
        db.SubCategory.findByPk(data.id).then((subcategory) => {
          expect(subcategory).to.be.equal(null);
          done();
        });
      });
    });
  });
});
