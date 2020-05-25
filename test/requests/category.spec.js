var chai = require("chai");
var request = require("supertest");
var sinon = require("sinon");
var app = require("../../app.js");
var should = chai.should();
var expect = chai.expect;
const db = require("../../models");

describe("# Category request", () => {
  context("#index", () => {
    before(async () => {
      await db.ThisWeekActivity.destroy({ where: {}, truncate: true });
      await db.NewActivity.destroy({ where: {}, truncate: true });
      await db.Can.destroy({ where: {}, truncate: true });
      await db.CanType.destroy({ where: {}, truncate: true });
      await db.Feed.destroy({ where: {}, truncate: true });
      await db.FeedAge.destroy({ where: {}, truncate: true });
      await db.FeedFunction.destroy({ where: {}, truncate: true });

      await db.Category.create({
        name: "Category",
        description: "CategoryDescription",
      });
      await db.SubCategory.create({
        name: "SubCategory",
        description: "SubCategoryDescription",
      });
      await db.ThisWeekActivity.create({
        name: "abc",
        description: "ThisWeekActivityDescription",
      });
      await db.NewActivity.create({
        name: "NewActivity",
        description: "NewActivityDescription",
      });
      await db.Can.create({ name: "Can", description: "CanDescription" });
      await db.CanType.create({
        name: "CanType",
        description: "CanTypeDescription",
      });
      await db.Feed.create({ name: "Feed", description: "FeedDescription" });
      await db.FeedAge.create({
        name: "FeedAge",
        description: "FeedAgeDescription",
      });
      await db.FeedFunction.create({
        name: "FeedFunction",
        description: "FeedFunctionDescription",
      });
    });
    after(async () => {
      await db.Category.destroy({ where: {}, truncate: true });
      await db.SubCategory.destroy({ where: {}, truncate: true });
      await db.ThisWeekActivity.destroy({ where: {}, truncate: true });
      await db.NewActivity.destroy({ where: {}, truncate: true });
      await db.Can.destroy({ where: {}, truncate: true });
      await db.CanType.destroy({ where: {}, truncate: true });
      await db.Feed.destroy({ where: {}, truncate: true });
      await db.FeedAge.destroy({ where: {}, truncate: true });
      await db.FeedFunction.destroy({ where: {}, truncate: true });
    });

    describe("GET /api/activity", () => {
      it("should render index", (done) => {
        request(app)
          .get("/api/activity")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "abc",
              "cde",
              "NewActivity",
              "NewActivityDescription",
              "Can",
              "CanDescription",
              "CanType",
              "CanTypeDescription",
              "Feed",
              "FeedDescription",
              "FeedAge",
              "FeedAgeDescription",
              "FeedFunction",
              "FeedFunctionDescription"
            );
            return done();
          });
      });
    });

    describe("GET /api/category/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 1,
          SubcategoryId: 4,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 6,
          FeedAgeId: 8,
          FeedFunctionId: 9,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/category/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "Category",
              "CategoryDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.CategoryTopProducts[0].amount.should.equal(20);
            res.body.CategoryTopProducts[0].SaleAmount.should.equal(30);
            res.body.CategoryTopProducts[0].price.should.equal(100);
            res.body.CategoryNewProducts[0].amount.should.equal(20);
            res.body.CategoryNewProducts[0].SaleAmount.should.equal(30);
            res.body.CategoryNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });

    describe("GET /api/subcategory/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 1,
          SubcategoryId: 1,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 6,
          FeedAgeId: 8,
          FeedFunctionId: 9,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/subcategory/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "SubCategory",
              "SubCategoryDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.SubCategoryTopProducts[0].amount.should.equal(20);
            res.body.SubCategoryTopProducts[0].SaleAmount.should.equal(30);
            res.body.SubCategoryTopProducts[0].price.should.equal(100);
            res.body.SubCategoryNewProducts[0].amount.should.equal(20);
            res.body.SubCategoryNewProducts[0].SaleAmount.should.equal(30);
            res.body.SubCategoryNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });

    describe("GET /api/thisweekactivity/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 1,
          CategoryId: 1,
          SubcategoryId: 4,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 6,
          FeedAgeId: 8,
          FeedFunctionId: 9,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/thisweekactivity/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "ThisWeekActivity",
              "ThisWeekActivityDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.ThisWeekActivityTopProducts[0].amount.should.equal(20);
            res.body.ThisWeekActivityTopProducts[0].SaleAmount.should.equal(30);
            res.body.ThisWeekActivityTopProducts[0].price.should.equal(100);
            res.body.ThisWeekActivityNewProducts[0].amount.should.equal(20);
            res.body.ThisWeekActivityNewProducts[0].SaleAmount.should.equal(30);
            res.body.ThisWeekActivityNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
    describe("GET /api/newactivity/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 3,
          SubcategoryId: 4,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 6,
          FeedAgeId: 8,
          FeedFunctionId: 9,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/newactivity/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "ThisWeekActivity",
              "ThisWeekActivityDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.NewActivityTopProducts[0].amount.should.equal(20);
            res.body.NewActivityTopProducts[0].SaleAmount.should.equal(30);
            res.body.NewActivityTopProducts[0].price.should.equal(100);
            res.body.NewActivityNewProducts[0].amount.should.equal(20);
            res.body.NewActivityNewProducts[0].SaleAmount.should.equal(30);
            res.body.NewActivityNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
    describe("GET /api/feed/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 3,
          SubcategoryId: 4,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 1,
          FeedAgeId: 8,
          FeedFunctionId: 9,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/feed/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "Feed",
              "FeedDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.FeedTopProducts[0].amount.should.equal(20);
            res.body.FeedTopProducts[0].SaleAmount.should.equal(30);
            res.body.FeedTopProducts[0].price.should.equal(100);
            res.body.FeedNewProducts[0].amount.should.equal(20);
            res.body.FeedNewProducts[0].SaleAmount.should.equal(30);
            res.body.FeedNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
    describe("GET /api/feedage/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 3,
          SubcategoryId: 4,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 8,
          FeedAgeId: 1,
          FeedFunctionId: 9,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/feedage/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "FeedAge",
              "FeedAgeDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.FeedAgeTopProducts[0].amount.should.equal(20);
            res.body.FeedAgeTopProducts[0].SaleAmount.should.equal(30);
            res.body.FeedAgeTopProducts[0].price.should.equal(100);
            res.body.FeedAgeNewProducts[0].amount.should.equal(20);
            res.body.FeedAgeNewProducts[0].SaleAmount.should.equal(30);
            res.body.FeedAgeNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
    describe("GET /api/feedfunction/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 3,
          SubcategoryId: 4,
          CanId: 5,
          CanTypeId: 7,
          FeedId: 8,
          FeedAgeId: 9,
          FeedFunctionId: 1,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/feedfunction/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "FeedFunction",
              "FeedFunctionDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.FeedFunctionTopProducts[0].amount.should.equal(20);
            res.body.FeedFunctionTopProducts[0].SaleAmount.should.equal(30);
            res.body.FeedFunctionTopProducts[0].price.should.equal(100);
            res.body.FeedFunctionNewProducts[0].amount.should.equal(20);
            res.body.FeedFunctionNewProducts[0].SaleAmount.should.equal(30);
            res.body.FeedFunctionNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
    describe("GET /api/can/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 3,
          SubcategoryId: 4,
          CanId: 1,
          CanTypeId: 7,
          FeedId: 8,
          FeedAgeId: 9,
          FeedFunctionId: 5,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/can/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "Can",
              "CanDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.CanTopProducts[0].amount.should.equal(20);
            res.body.CanTopProducts[0].SaleAmount.should.equal(30);
            res.body.CanTopProducts[0].price.should.equal(100);
            res.body.CanNewProducts[0].amount.should.equal(20);
            res.body.CanNewProducts[0].SaleAmount.should.equal(30);
            res.body.CanNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
    describe("GET /api/cantype/1", () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true });

        await db.Product.create({
          name: "Product",
          description: "ProductDescription",
          image: "ProductImage",
          amount: 20,
          SaleAmount: 30,
          specification: "ProductSpecification",
          price: 100,
          detail: "ProductDetail",
          launched: true,
          NewActivityId: 1,
          ThisWeekActivityId: 2,
          CategoryId: 3,
          SubcategoryId: 4,
          CanId: 7,
          CanTypeId: 1,
          FeedId: 8,
          FeedAgeId: 9,
          FeedFunctionId: 5,
        });
      });

      it("should render index", (done) => {
        request(app)
          .get("/api/cantype/1")
          .set("Accept", "application/json")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.text.should.include(
              "Product",
              "ProductDescription",
              "ProductImage",
              "ProductSpecification",
              "ProductDetail",
              "CanType",
              "CanTypeDescription"
            );
            res.body.TopProducts[0].amount.should.equal(20);
            res.body.TopProducts[0].SaleAmount.should.equal(30);
            res.body.TopProducts[0].price.should.equal(100);
            res.body.NewProducts[0].amount.should.equal(20);
            res.body.NewProducts[0].SaleAmount.should.equal(30);
            res.body.NewProducts[0].price.should.equal(100);
            res.body.CanTypeTopProducts[0].amount.should.equal(20);
            res.body.CanTypeTopProducts[0].SaleAmount.should.equal(30);
            res.body.CanTypeTopProducts[0].price.should.equal(100);
            res.body.CanTypeNewProducts[0].amount.should.equal(20);
            res.body.CanTypeNewProducts[0].SaleAmount.should.equal(30);
            res.body.CanTypeNewProducts[0].price.should.equal(100);
            return done();
          });
      });

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true });
      });
    });
  });
});
