function ConvertHandler() {

  this.isNumAndUnitValid = function(initNum, initUnit, invalid, valid){
    if(!initNum || !initUnit){
      let response = "invalid";
      if(!initNum) response += " number";
      if(!initNum && !initUnit) response += " and";
      if(!initUnit) response += " unit";
      invalid(response)
    }else{
      valid()
    }
  };

  this.getNum = function(input) {
    let result = /((^\d+|^\d*\.\d*)\/(\d+|\d*\.\d*)|^\d+|^\b|\d*\.\d*)[A-z]+/.test(input);
  
    if(result){
      result = input.match(/\d*\.\d*|\d+/ig)
      if(!result){
        result = 1;
      }else if(result.length == 2 ){
        result = Number(result[0])/Number(result[1]);
      }else if(result.length == 1){
        result = result[0];
      };
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let unit =  input.match(/[A-z]+/i)[0].toLowerCase();

    switch (unit) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
       return false;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "L":
        return "gal";
      case "kg":
        return "lbs";
    };
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "L":
        return "liters";
      case "kg":
        return "kilograms";
    };
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    };
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spellInit = this.spellOutUnit(initUnit);
    let spellResponse = this.spellOutUnit(returnUnit)
    let string = `${initNum} ${spellInit} converts to ${returnNum} ${spellResponse}`;

    return string;
  };
  
}

module.exports = ConvertHandler;