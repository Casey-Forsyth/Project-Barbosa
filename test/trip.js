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
      .get('/trips/5310bc1553dbeb2728f5a000')
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
  it('should create a new trip', function(done) {
    tripname = "TEST_TRIP"
    request(app)
      .post('/trips')
      .send({trip:{name: tripname}})
      .end(function(err, res){
        res.should.have.status(200)
        res.body.should.have.property('trip')
        res.body.trip.should.have.property('name', tripname)
        // make sure the trip actually exists in the DB
        Trip.findById(trip.id, function(err, trip){
          trip.should.have.property('name', tripname)
        })
        done()
      })
  })

  it('should 404 is there is a /:tripid', function(done) {
    request(app)
      .post('/trips/invalidLocation')
      .expect('Content-Type', /html/)
      .expect(404, done);
  })

  it('should set a default name of "My Trip"', function(done) {
    request(app)
      .post('/trips')
      .end(function(err, res){
        res.should.have.status(200)
        res.body.should.have.property('trip')
        res.body.trip.should.have.property('name', 'My Trip')
        done()
      })
  })
})

describe('DELETE /trips/:tripid', function(){
  it('should 404 on a missing trip', function(done){
    request(app)
      .del('/trips/5310bc1553dbeb2728f5a000')
      .end(function(err, res){
        res.should.have.status(404)
        done()
      })
    })

  it('should delete a trip', function(done){
    trip = new Trip()
    trip.save(function(){
      request(app)
        .del('/trips/' + trip.id)
        .end(function(err, res){
          // test that it claims to have worked
          res.should.have.status(200)
          res.body.should.be.empty
          // make sure it actually worked
          Trip.findById(trip.id, function(err, trip){
            (trip == null).should.be.true
          })
          done()
        })
    })
  })
})
