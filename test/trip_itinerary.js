//requires
var assert = require("assert");
var should = require('should');
var express = require('express');
var ItineraryItem = require('../models/ItineraryItem').model;
var Trip = require('../models/Trip');
var app = require('../app.js');
var request = require('supertest');

var testTrip = new Trip({name: "*Test Trip*"});

before(function() {
  testTrip.save(function(err) {
    if (err && err.code != 11000) { //Create a test trip. If trip exists (err.code 11000 returned), do nothing.
      assert.fail(err, null, 'Test trip creation error.')
    }
  })
})

describe('Itinerary Items', function() {

  describe('GET /trip/:tripid/items', function() {

    it('should respond with an empty list of itinerary items', function(done) {

      Trip.find().exec(function(err, items){

        request(app)
          .get('/trip/' + testTrip.id + '/items')
          .set('Accept','application/json')
          .expect('Content-Type', /json/)
          .expect(200, {itinerary: []})
        .end(done)

      });

    });

  });

	describe('POST /trips/:tripid/items', function() {

		itineraryItem1Title = "Test Item 1";
		itineraryItem1 = new ItineraryItem({title: itineraryItem1Title});

		itineraryItem2Title = "Test Item 1";
		itineraryItem2 = new ItineraryItem({title: itineraryItem1Title});

	  it('should add a new itinerary item (first item)', function(done) {

      request(app)
        .post('/trips/' + testTrip.id + '/items')
        .send({itineraryItem: itineraryItem1})
        .set('Accept','application/json')
        .end(function(err, res){
          res.should.have.status(200)
          res.body.trip.itinerary.should.have.length(1)
          res.body.trip.itinerary[0].should.have.property('title', itineraryItem1Title)
          // make sure the item actually exists in the DB
          Trip.findById(testTrip.id, function(err, trip){
            trip.itinerary[0].should.have.property('id', itineraryItem1.id)
          })
          done()
        });

		});

    it('should add a new itinerary item (second item)', function(done) {

      request(app)
        .post('/trips/' + testTrip.id + '/items')
        .send({itineraryItem: itineraryItem2})
        .set('Accept','application/json')
        .end(function(err, res){
          res.should.have.status(200)
          res.body.trip.itinerary.should.have.length(2)
          res.body.trip.itinerary[1].should.have.property('title', itineraryItem2Title)
          // make sure the item actually exists in the DB
          Trip.findById(testTrip.id, function(err, trip){
            trip.itinerary[1].should.have.property('id', itineraryItem2.id)
          })
          done()
        });

    });

  });

  describe('GET /trip/:tripid/items', function() {

    it('should respond with a non-empty list of itinerary items (length of 2)', function(done) {

      Trip.find().exec(function(err, items){

        request(app)
          .get('/trip/' + testTrip.id + '/items')
          .set('Accept','application/json')
          .end(function(err, res){
            res.should.have.status(200)
            res.body.itinerary.should.have.length(2)
            res.body.itinerary[0].should.have.property('title', itineraryItem1Title)
            res.body.itinerary[1].should.have.property('title', itineraryItem2Title)
            done()
          });

      });

    });

  });

});

after(function() {
  testTrip.remove()
})
