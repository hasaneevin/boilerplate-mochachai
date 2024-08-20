const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Hasan')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Hasan');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({surname : 'Colombo'})

        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name,'Cristoforo',);
          assert.equal(res.body.surname,'Colombo','res.body.surname should be "Colombo"');

          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({surname: 'da Verrazzano'})

        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name,'Giovanni',);
          assert.equal(res.body.surname,'da Verrazzano','res.body.surname should be "Colombo"');

          done();
        });

      
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://3000-freecodecam-boilerplate-rcc6po9ujr5.ws-us115.gitpod.io';
const browser = new Browser();
suite('Functional Tests with Zombie.js', function() {
  
  this.timeout(5000);
  
  suiteSetup(function(done) {
    browser.visit('/', function(err) {
      if (err) return done(err);
      browser.assert.success();
      done();
    });
  });
 
  suite('Headless browser', function() {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });
   
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function(done) {
        browser.fill('surname', 'Colombo');
        browser.pressButton('submit', function() {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.element('span#dates', 1);
    
          done(); 
      });
    });
    
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname', 'Vespucci');
      browser.pressButton('submit', function() {
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.element('span#dates', 1);
        
        done();
      });
    });
});
});
