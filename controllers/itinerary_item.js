var mongoose = require('mongoose');
var ItineraryItem = require('../models/ItineraryItem').model;
var Trip = require('../models/Trip');
var extend = require('util')._extend;

/**
 * Load a trip item.
 */

exports.load = function(req, res, next, itemid){
  ItineraryItem.findById(itemid, function(err, item) {
    if (err)
      req.err = err
    else if (!item)
      req.err = new Error('ItineraryItem not found')
    else
      req.item = item
    next()
  })
 }
/**
* GET /items
* Return all itinerary items matching a query string
*/

exports.listTripItineraryItems = function(req, res) {
  ids = req.query.ids
  query = ids ? { _id: { $in: ids } } : {}

  ItineraryItem.find(query , function(err, items){
    if (err)  res.status(500).json({errors:[err.message]})
    else      res.json({items: items})
  })
};

/**
* POST /items
* Create a new itinerary item
*/

exports.createItineraryItem = function(req, res) {
  tripid = req.body.item.trip_id
  if (!tripid) {
    res.status(500).json(null)
    return
  };
  Trip.findById(tripid).exec(function(err, trip) {
    if (err) {
      res.status(500).json(null);
    } else {
      item = new ItineraryItem(req.body.item)
      item.save(function(){
        trip.itinerary.push(item)
        trip.save(function (err) {
          if (err) {
            res.status(500).json(null);
          };
          res.json({item:item});
        })
      })
    }
  })
}

/**
* GET /items/:itemid
* Return an itinerary item
*/

exports.showItineraryItem = function(req, res) {
  if (req.item) {
    res.json({item:req.item});
  } else {
    res.status(500).json(null);
  }
}

/**
* PUT /items/:itemid
* Update a trip.
*/

exports.updateItineraryItem = function(req, res){
  if (!req.item) {
    return res.status(500).json(null)
  }
  updatedItem = extend(req.item, req.body.item)
  updatedItem.save(function(err){
    if (err)  res.status(500).json({errors: err.message})
    else      res.json({item:updatedItem})
  })
}

/**
* DELETE /trip/:tripid/items/:itemid
* Delete an itinerary item.
*/

exports.deleteItineraryItem = function(req, res){
  if (!req.item) {
    return res.status(500).json(null)
  }
  req.item.remove(function(err){
    if (err)  res.status(500).json({errors: err.message})
    else      res.json(null)
  })
};
