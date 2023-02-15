const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite("Numbers type", function(){
    let getNum = convertHandler.getNum; 
    let isNumAndUnitValid = convertHandler.isNumAndUnitValid;

    test("convertHandler deverá ler corretamente a entrada de números inteiros.", function(){
      let input = "18abc";
      assert.equal(getNum(input), 18);
    });

    test("convertHandler deverá ler corretamente a entrada de números decimais.", function(){
      let input = "1.8abc";
      assert.equal(getNum(input), 1.8);
    });

    test("convertHandler deverá ler corretamente a entrada de frações.", function(){
      let input = "36/2abc";
      assert.equal(getNum(input), 18);
    });

    test("convertHandler deverá ler corretamente a entrada de frações com decimais.", function(){
        let input = "45/2.5abc";
        assert.equal(getNum(input), 18);
      });

    test("convertHandler deve retornar corretamente um erro em uma dupla fração (por exemplo, 3/2/3", function(){
      let input = "72/2/2abc";
      let num = getNum(input);
      let unit = true;
      isNumAndUnitValid(num, unit, function(error){
        assert.equal(error, "invalid number");
        }, () => "valid")
      });

    test("convertHandler deverá apresentar corretamente como padrão uma entrada numérica de 1 quando nenhuma entrada numérica for fornecida.", function(){
      let input = "abc"
      assert.equal(getNum(input), 1)
    });

    });
  suite("Units type", function(){ 
    let getUnit = convertHandler.getUnit;
    let isNumAndUnitValid = convertHandler.isNumAndUnitValid;
    let getReturnUnit = convertHandler.getReturnUnit;
    let spellOutUnit = convertHandler.spellOutUnit;
    let convert = convertHandler.convert
    let metricImperial = [
        {m: "L", i: "gal", mText: "liters", iText: "gallons", mToI: 0.26417, iToM: 3.78541},
        {m: "km", i: "mi", mText: "kilometers", iText: "miles", mToI:  0.62137 , iToM: 1.60934},
        {m: "kg", i: "lbs", mText: "kilograms", iText: "pounds", mToI: 2.20462, iToM:  0.45359}
    ];

    test("convertHandler deverá ler corretamente unidade de entrada válida.", function(){
       metricImperial.forEach(function(units){
         let input = "18" + units.m
         assert.equal(getUnit(units.m), units.m)
       });
       metricImperial.forEach(function(units){
        let input = "18" + units.i
        assert.equal(getUnit(units.i), units.i)
      });
    });

    test("convertHandler deverá retornar corretamente um erro para uma unidade de entrada inválida.", function(){
        metricImperial.forEach(function(units){
          let num = true;
          let unit = getUnit("18" + units.m);
          isNumAndUnitValid(num, unit, function(error){
            assert.equal(error, "invalid unit")
          }, () => "valid")
        });
        metricImperial.forEach(function(units){
          let num = true;
          let unit = getUnit("18" + units.i);
          isNumAndUnitValid(num, unit, function(error){
            assert.equal(error, "invalid unit")
          }, () => "valid")
       });
     });
    
     test("convertHandler deverá retornar corretamente a unidade para cada unidade de entrada válida.", function(){
        metricImperial.forEach(function(units){
          assert.equal(getReturnUnit(units.m), units.i)
          });
        metricImperial.forEach(function(units){
           assert.equal(getReturnUnit(units.i), units.m)
        });
      });

     test("convertHandler deverá retornar corretamente a unidade em string estendida para cada unidade de entrada válida.", function(){
        metricImperial.forEach(function(units){
            assert.equal(spellOutUnit(units.m), units.mText)
        });
        metricImperial.forEach(function(units){
             assert.equal(spellOutUnit(units.i), units.iText)
        });
       });
    })
    suite("Metric to Imperial", function(){
        let convert = convertHandler.convert
        let metricImperial = [
            {m: "L", i: "gal", mText: "liters", iText: "gallons", mToI: 0.26417, iToM: 3.78541},
            {m: "km", i: "mi", mText: "kilometers", iText: "miles", mToI:  0.62137 , iToM: 1.60934},
            {m: "kg", i: "lbs", mText: "kilograms", iText: "pounds", mToI: 2.20462, iToM:  0.45359}
        ];

       test("L To gal", function(){
        let units = metricImperial[0]
         assert.approximately(convert(1, units.m), units.mToI, 0.1)
       });
       test("gal To L", function(){
        let units = metricImperial[0]
         assert.approximately(convert(1, units.i), units.iToM, 0.1)
       });
       test("km To mi", function(){
        let units = metricImperial[1]
         assert.approximately(convert(1, units.m), units.mToI, 0.1)
       });
       test("mi To km", function(){
        let units = metricImperial[1]
         assert.approximately(convert(1, units.i), units.iToM, 0.1)
       });
       test("kg To lbs", function(){
        let units = metricImperial[2]
         assert.approximately(convert(1, units.m), units.mToI, 0.1)
       });
       test("lbs To kg", function(){
        let units = metricImperial[2]
         assert.approximately(convert(1, units.i), units.iToM, 0.1)
       });
   });
});