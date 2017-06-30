'use strict';

var app = require('../..');
import request from 'supertest';

var newLabel;

describe('Label API:', function() {

  describe('GET /api/labels', function() {
    var labels;

    beforeEach(function(done) {
      request(app)
        .get('/api/labels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          labels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(labels).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/labels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/labels')
        .send({
          name: 'New Label',
          info: 'This is the brand new label!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLabel = res.body;
          done();
        });
    });

    it('should respond with the newly created label', function() {
      expect(newLabel.name).to.equal('New Label');
      expect(newLabel.info).to.equal('This is the brand new label!!!');
    });

  });

  describe('GET /api/labels/:id', function() {
    var label;

    beforeEach(function(done) {
      request(app)
        .get('/api/labels/' + newLabel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          label = res.body;
          done();
        });
    });

    afterEach(function() {
      label = {};
    });

    it('should respond with the requested label', function() {
      expect(label.name).to.equal('New Label');
      expect(label.info).to.equal('This is the brand new label!!!');
    });

  });

  describe('PUT /api/labels/:id', function() {
    var updatedLabel;

    beforeEach(function(done) {
      request(app)
        .put('/api/labels/' + newLabel._id)
        .send({
          name: 'Updated Label',
          info: 'This is the updated label!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLabel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLabel = {};
    });

    it('should respond with the updated label', function() {
      expect(updatedLabel.name).to.equal('Updated Label');
      expect(updatedLabel.info).to.equal('This is the updated label!!!');
    });

  });

  describe('DELETE /api/labels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/labels/' + newLabel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when label does not exist', function(done) {
      request(app)
        .delete('/api/labels/' + newLabel._id)
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
