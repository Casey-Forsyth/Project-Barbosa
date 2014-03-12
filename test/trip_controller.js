  //requires
var assert = require("assert");
var express = require('express');
var app = require('../app.js');
var request = require('supertest');
var Trip = require('../models/Trip');
var ItineraryItem = require('../models/ItineraryItem').model;

describe('Trip Controller', function(){

  describe('GET /trips/:id', function() {
    it('should 404 with an invalid id', function(done) {
      request(app)
        .get('/trips/notarealmongoid')
        .end(function(err, res){
          res.should.have.status(404).and.throw()
          done()
        })
    })

    it('should list trip item ids', function(done){
      item = new ItineraryItem({title: 'foo'})
      item.save(function(){
        trip = new Trip({name: 'with an itinerary', itinerary: [item]})
        trip.save(function(){
          request(app)
            .get('/trips/' + trip.id)
            .end(function(err, res){
              res.should.have.status(200)
              res.body.should.have.property('trip')
              res.body.trip.itinerary_ids.should.have.lengthOf(1)
              res.body.items.should.have.lengthOf(1)
              done()
            })
        })
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

  describe('GET /trips', function(){
    describe('by default', function(){
      it('should only show trips for the current user')
      it('should require a logged in user')

      it('should filter out archived trips', function(done){
        archived_trip = new Trip({archived: true})
        archived_trip.save(function(){
          request(app)
            .get('/trips')
            .end(function(err, res){
              res.should.have.status(200)
              res.body.should.have.property('trips')
                .and.should.not.be.empty

              res.body.trips.should.matchEach(function(it){
                it.should.have.property('archived', false)
              })
              done()
            })
        })
      })

      it('should list all users\' trips [for now]', function(done){
        request(app)
          .get('/trips')
          .end(function(err, res){
            res.should.have.status(200)

            res.body.should.have.property('trips')
              .and.should.not.be.empty

            res.body.trips[0].should.have.properties('name', '_id')
            done()
          })
      })
    })

    describe('with archived=true as a query param', function(){
      it('should return only archived trips ', function(done){
        request(app)
          .get('/trips?archived=true')
          .end(function(err, res){
            res.should.have.status(200)

            res.body.should.have.property('trips')
              .and.should.not.be.empty

            res.body.trips.should.matchEach(function(it){
              return it.should.have.property('archived', true)
            })
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

  describe('PUT /trips/:tripid', function(){
    it('should 404 on a missing trip', function(done){
      request(app)
        .put('/trips/5310bc1553dbeb2728f5a000')
        .end(function(err, res){
          res.should.have.status(404)
          done()
        })
    })

    it('should update a trip', function(done){
      n1 = 'original name'
      n2 = 'updated name'
      trip = new Trip({name: n1})
      trip.save(function(){
        request(app)
          .put('/trips/' + trip.id)
          .send({trip:{name:n2}})
          .end(function(err, res){
            res.should.have.status(200)
            res.body.should.have.property('trip')
            res.body.trip.should.have.property('name', n2)
            done()
          })
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

    it('should just archive a trip', function(done){
      trip = new Trip()
      trip.save(function(){
        request(app)
          .del('/trips/' + trip.id)
          .end(function(err, res){
            // test that it claims to have worked
            res.should.have.status(200)
            res.body.should.be.empty
            // test that it just set the deleted flag
            Trip.findById(trip.id, function(err, trip){
              (trip == null).should.be.false
              trip.archived.should.be.true
            })
            done()
          })
      })
    })
  })
})