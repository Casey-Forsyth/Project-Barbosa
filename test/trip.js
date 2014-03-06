//requires
var assert = require("assert");
var express = require('express');
var app = require('../app.js');
var request = require('supertest');
var Trip = require('../models/Trip');

describe('GET /trips/:id', function() {
  it('should 404 with an invalid id', function(done) {
    request(app)
      .get('/trips/notarealmongoid')
      .end(function(err, res){
        res.should.have.status(404).and.throw()
        done()
      })
  })

  it('should 404 with a missing id', function(done) {
    request(app)
      .get('/trips/notarealmongoid')
      .end(function(err, res){
        res.should.have.status(404).and.throw()
        done()
      })
  })

  it('should return valid json for a valid id', function(done) {
    tripname = 'my test trip'
    trip = new Trip({
      name: tripname
    })
    trip.save(function(){
      request(app)
        .get('/trips/' + trip.id)
        .end(function(err, res){
          res.should.have.status(200)
          res.body.should.have.property('trip')
          res.body.trip.should.have.property('name', tripname)
          done()
        })
    })
  })
})

describe('POST /trips', function() {
  it('should respond with json', function(done) {
    request(app)
      .post('/trips')
      .send({trip:{name: "TEST_TRIP"}})
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
	})
});

describe('POST /trips/invalidLocation', function() {
  it('should return 404', function(done) {
    request(app)
      .post('/trips/invalidLocation')
      .send({trip:{name: "TEST_TRIP2"}})
      .set('Accept','application/json')
      .expect('Content-Type', /html/)
      .expect(404, done);
	})
});

describe('POST /api', function() {
  it('should return 404', function(done) {
    request(app)
      .post('/api')
      .send({trip:{name: "TEST_TRIP3"}})
      .set('Accept','application/json')
      .expect('Content-Type', /html/)
      .expect(404, done);
	})
});
