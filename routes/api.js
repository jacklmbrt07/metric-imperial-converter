/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");
const bunyan = require("bunyan");
const log = bunyan.createLogger({ name: "Metric/Imperial Converter" });

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    log.info("incoming request", { input: req.query.input });

    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    log.debug("incoming request", {
      headers: req.headers,
      query: req.query,
      body: req.body,
    });

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      var error = "invalid number and unit";
      log.info("Request failed and returning error", error);
      res.json(error);
    }

    if (initNum === "invalid number") {
      var error = "invalid number";
      log.info("Request failed and returning error", error);
      res.json(error);
    }

    if (initUnit === "invalid unit") {
      var error = "invalid unit";
      log.info("Request failed and returning error", error);
      res.json(error);
    }

    let responseObject = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString,
    };

    res.json(responseObject);
  });
};
