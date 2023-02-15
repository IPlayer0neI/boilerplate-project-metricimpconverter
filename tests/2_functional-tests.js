const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Converta uma entrada válida, como 10L: solicitação de GET para /api/convert.", function(done){
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function(err, res){
        let obj = JSON.parse(res.text);
        assert.equal(res.status, 200);
        assert.approximately(obj.returnNum,  2.64172, 0.1)
      });
      done()
  });

  test("Converta uma entrada inválida, como 32g: solicitação de GET para /api/convert.", function(done){
    chai
    .request(server)
    .get("/api/convert?input=32g")
    .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit")
    });
    done()
  });

  test("Converta um número inválido, como 3/7.2/4kg: solicitação de GET para /api/convert.", function(done){
    chai
    .request(server)
    .get("/api/convert?input=3%2F7.2%2F4kg")
    .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number")
    });
    done()
  });
  
  test("Converta um número inválido E uma unidade, como 3/7.2/4kilomegagram: solicitação de GET para /api/convert", function(done){
    chai
    .request(server)
    .get("/api/convert?input=3%2F7.2%2F4kilomegagram")
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.text, "invalid number and unit")
    });
    done()
  });

  test("Converta sem número, como kg: solicitação de GET para /api/convert", function(done){
    chai
    .request(server)
    .get("/api/convert?input=kg")
    .end(function(err, res){
        let obj = JSON.parse(res.text)
        assert.equal(res.status, 200);
        assert.equal(obj.initNum, 1);
    });
    done()
  });
});
