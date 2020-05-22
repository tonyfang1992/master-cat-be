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
const CatModel = require("../../models/cat");

describe("# Cat Model", () => {
  before((done) => {
    done();
  });

  const Cat = CatModel(sequelize, dataTypes);
  const cat = new Cat();
  checkModelName(Cat)("Cat");

  context("properties", () => {
    ["name", "gender", "UserId", "age", "weight", "breed"].forEach(
      checkPropertyExists(cat)
    );
  });

  context("associations", () => {
    const User = "User";

    before(() => {
      Cat.associate({ User });
    });

    it("should belongs to user", (done) => {
      expect(Cat.belongsTo).to.have.been.calledWith(User);
      done();
    });
  });

  context("action", () => {
    let data = null;

    it("create", (done) => {
      db.Cat.create({}).then((cat) => {
        data = cat;
        done();
      });
    });
    it("read", (done) => {
      db.Cat.findByPk(data.id).then((cat) => {
        expect(data.id).to.be.equal(cat.id);
        done();
      });
    });
    it("update", (done) => {
      db.Cat.update({}, { where: { id: data.id } }).then(() => {
        db.Cat.findByPk(data.id).then((cat) => {
          expect(data.updatedAt).to.be.not.equal(cat.updatedAt);
          done();
        });
      });
    });
    it("delete", (done) => {
      db.Cat.destroy({ where: { id: data.id } }).then(() => {
        db.Cat.findByPk(data.id).then((cat) => {
          expect(cat).to.be.equal(null);
          done();
        });
      });
    });
  });
});
