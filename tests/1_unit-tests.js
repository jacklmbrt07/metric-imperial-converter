/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      let input = "3.25mi";
      assert.equal(convertHandler.getNum(input), 3.25);
      done();
    });

    test("Fractional Input", function (done) {
      let input = "12/8mi";
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      let input = "27/5.4mi";
      assert.equal(convertHandler.getNum(input), 5);
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      let input = "3/7.2/4kg";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("No Numerical Input", function (done) {
      let input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), "kg");
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach(function (ele) {
        assert.equal(convertHandler.getUnit(32 + ele), ele);
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      let input = "32g";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallon(s)",
        "liter(s)",
        "mile(s)",
        "kilometer(s)",
        "pound(s)",
        "kilogram(s)",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
      //done();
    });

    test("Mi to Km", function (done) {
      let input = [5, "mi"];
      let expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
      //done();
    });

    test("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
      //done();
    });

    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
      //done();
    });

    test("Kg to Lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
      //done();
    });
  });
});
