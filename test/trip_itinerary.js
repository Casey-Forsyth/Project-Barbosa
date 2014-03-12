//requires
var assert = require("assert");
var should = require('should');
var express = require('express');
var ItineraryItem = require('../models/ItineraryItem').model;
var Trip = require('../models/Trip');
var app = require('../app.js');
var request = require('supertest');

describe('Trip items', function() {
  it('should have a name', function(done) {
    item_name = "trip item name"
    itineraryItem = new ItineraryItem();
    itineraryItem.name = item_name;
    assert.equal(itineraryItem.name, item_name)
    done()
  })

  it('should have a scheduledAt Date, defaulting to null', function(done) {
    now = new Date()
    itineraryItem = new ItineraryItem()
    assert.equal(itineraryItem.updatedAt, null)
    itineraryItem.scheduledAt = now
    assert.equal(itineraryItem.scheduledAt.toISOString(), now.toISOString())
    done()
  })

  it('should have a location with a name, lat, and long', function(done) {
    loc = {
      name: "Takeoff from YWG",
      latitude: 49.89,
      longitude: -97.1,
    }
    itineraryItem = new ItineraryItem({location: loc})
    itineraryItem.location.should.have.properties(['name', 'latitude', 'longitude'])
    done()
  })
})