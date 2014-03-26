var mongoose = require('mongoose');
var Trip = require('../models/Trip');
var User = require('../models/User');
var extend = require('util')._extend;
var async = require('async')

/**
 * Load a trip.
 */

exports.load = function(req, res, next, tripid){
  Trip.findById(tripid, function(err, trip) {
    if (err)
      req.err = err
    else if (!trip)
      req.err = new Error('Trip not found')
    else
      req.trip = trip
    next()
  })
 }

/**
 * PUT /trips/:id
 * Update a trip.
 */

exports.updateTrip = function(req, res){
  if (!req.trip) return res.status(404).json(null);

  updated_trip = extend(req.trip, req.body.trip)
  updated_trip.save(function (err) {
    if (err) res.status(500).json(null)
    res.json( { trip: updated_trip } );
  })
}

/**
 * DELETE /trips/:id
 * Delete a trip.
 */

exports.deleteTrip = function(req, res){
  if (!req.trip) return res.status(404).json(null);

  req.trip.archived = true
  req.trip.save(function (err) {
    if (err) res.status(500).json(null)
    res.json({})
  })
}

/**
 * GET /trips/:id
 * Get a trip!
 */

exports.showTrip = function(req, res) {
  if (!req.trip) return res.status(404).json(null);
  res.json(req.trip.flattened())
};

/**
 * GET /trips
 * Get all trips
 */

exports.listTrips = function(req, res) {

  query = {
    archived: req.query.archived || false
  }

  if(req.query.userID) {
    query.userID = req.query.userID
  }

  Trip.find(query).exec(function(err, trips) {
    if (err) {
      res.status(500).json(null);
    } else {

      tripList = []
      for(i = 0; i < trips.length; i++) {

        flattenedTrip = trips[i].flattened();
        tripList.push(flattenedTrip.trip);

      }

      async.each(tripList, function(trip, next) {
        User.findOne({_id: trip.userID}).exec(function(err, user) {
          if(!err) {
            trip.user = user
          } else {
            trip.user = {
              profile: {
                name: 'Guest'
              }
            }
          }
          delete trip.userID
          next(false, trip)
        })
      },
      function(err) {
        res.json({trips: tripList})
      });
    }
  })
}

/**
 * POST /trips
 * Create a new trip!
 */

exports.createTrip = function(req, res) {

  trip = new Trip(req.body.trip)
<<<<<<< HEAD
  
=======
  trip.date = Date.now()

>>>>>>> master
  if(req.user)
    trip.userID = req.user._id;

  trip.save(function(err, trip){
    if(err) {
      res.status(500).json(null)
    } else {
      res.json({trip:trip})
    }
  })
};

exports.testLogin = function(req, res) {
  if(req.user) {
    res.json({loggedin: true});
    console.log('logged in');
  } else {
    res.json({loggedin: false});
    console.log('not logged in');
  }
}
