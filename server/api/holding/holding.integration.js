'use strict';

var app = require('../..');
import request from 'supertest';

var newHolding;

describe('Holding API:', function() {

  describe('GET /api/holdings', function() {
    var holdings;

    beforeEach(function(done) {
      request(app)
        .get('/api/holdings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          holdings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(holdings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/holdings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/holdings')
        .send({
          name: 'New Holding',
          info: 'This is the brand new holding!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newHolding = res.body;
          done();
        });
    });

    it('should respond with the newly created holding', function() {
      expect(newHolding.name).to.equal('New Holding');
      expect(newHolding.info).to.equal('This is the brand new holding!!!');
    });

  });

  describe('GET /api/holdings/:id', function() {
    var holding;

    beforeEach(function(done) {
      request(app)
        .get('/api/holdings/' + newHolding._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          holding = res.body;
          done();
        });
    });

    afterEach(function() {
      holding = {};
    });

    it('should respond with the requested holding', function() {
      expect(holding.name).to.equal('New Holding');
      expect(holding.info).to.equal('This is the brand new holding!!!');
    });

  });

  describe('PUT /api/holdings/:id', function() {
    var updatedHolding;

    beforeEach(function(done) {
      request(app)
        .put('/api/holdings/' + newHolding._id)
        .send({
          name: 'Updated Holding',
          info: 'This is the updated holding!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHolding = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHolding = {};
    });

    it('should respond with the updated holding', function() {
      expect(updatedHolding.name).to.equal('Updated Holding');
      expect(updatedHolding.info).to.equal('This is the updated holding!!!');
    });

  });

  describe('DELETE /api/holdings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/holdings/' + newHolding._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when holding does not exist', function(done) {
      request(app)
        .delete('/api/holdings/' + newHolding._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
