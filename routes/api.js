'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.route("/api/convert")
    .get(function(req, res){
       let input = req.query.input;
       let initNum = convertHandler.getNum(input);
       let initUnit = convertHandler.getUnit(input);
       convertHandler.isNumAndUnitValid(initNum, initUnit, (err) => res.send(err), function(){
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit, res);
        let response = {
          initNum: initNum,
          initUnit: initUnit,
          returnUnit: returnUnit,
          returnNum: returnNum,
          string: string
        };
        res.json(response);
       });
    });
};
