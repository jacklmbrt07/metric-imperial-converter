/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const { init } = require("../server");

const inputRegex = /[a-z]+|[^a-z]+/gi;

function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    result = input.match(inputRegex)[0];

    let numRegex = /\d/;

    if (numRegex.test(result) === false) {
      result = 1;
    }

    if (result.toString().includes("/")) {
      let values = result.toString().split("/");
      if (values.length != 2) {
        return "invalid number";
      }
      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      result = parseFloat((values[0] / values[1]).toFixed(5));
    }

    if (isNaN(result)) return "invalid number";

    return parseFloat(result);
  };

  this.getUnit = function (input) {
    input = input.toLowerCase();
    let result = input.match(inputRegex)[1];

    if (!result) {
      result = input.match(inputRegex)[0];
    }

    let validUnits = [
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

    if (!validUnits.includes(result)) {
      return "invalid unit";
    }

    if (result == 'l') { 
      result = 'L'
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    if (initUnit === "gal" || initUnit === "GAL") {
      result = "L";
    } else if (initUnit === "l" || initUnit === "L") {
      result = "gal";
    }

    if (initUnit === "lbs" || initUnit === "LBS") {
      result = "kg";
    } else if (initUnit === "kg" || initUnit === "KG") {
      result = "lbs";
    }

    if (initUnit === "mi" || initUnit === "MI") {
      result = "km";
    } else if (initUnit === "km" || initUnit === "KM") {
      result = "mi";
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case "gal":
      case "GAL":
        result = "Gallon(s)";
        break;
      case "l":
      case "L":
        result = "Liter(s)";
        break;
      case "lbs":
      case "LBS":
        result = "Pound(s)";
        break;
      case "kg":
      case "KG":
        result = "Kilogram(s)";
        break;
      case "mi":
      case "MI":
        result = "Mile(s)";
        break;
      case "km":
      case "KM":
        result = "Kilometer(s)";
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === "gal" || initUnit === "GAL") {
      result = (initNum * galToL).toFixed(5);
    } else if (initUnit === "l" || initUnit === "L") {
      result = (initNum / galToL).toFixed(5);
    }

    if (initUnit === "lbs" || initUnit === "LBS") {
      result = (initNum * lbsToKg).toFixed(5);
    } else if (initUnit === "kg" || initUnit === "KG") {
      result = (initNum / lbsToKg).toFixed(5);
    }

    if (initUnit === "mi" || initUnit === "MI") {
      result = (initNum * miToKm).toFixed(5);
    } else if (initUnit === "km" || initUnit === "KM") {
      result = (initNum / miToKm).toFixed(5);
    }

    return parseFloat(result);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initial_Units = this.spellOutUnit(initUnit)
    let return_Units = this.spellOutUnit(returnUnit)

    let result = `${initNum} ${initial_Units} converts to ${returnNum} ${return_Units}`;

    return result;
  };
}

module.exports = ConvertHandler;
