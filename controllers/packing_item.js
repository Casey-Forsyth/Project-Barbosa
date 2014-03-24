var mongoose = require('mongoose');
var PackingItem = require('../models/PackingItem').model;
var Trip = require('../models/Trip');
var extend = require('util')._extend;

/**
* POST /items
* Create a new packing item
*/

exports.createPackingItem = function(req, res) {

  tripid = req.body.packing_item.trip_id

  if (!tripid) {
    res.status(500).json(null)
    return
  };
  Trip.findById(tripid).exec(function(err, trip) {
    if (err) {
      res.status(500).json(null);
    } else {
      item = new PackingItem(req.body.packing_item)
      item.save(function(){
        trip.packingItems.push(item)
        trip.save(function (err) {
          if (err) {
            res.status(500).json(null);
          };
          res.json({packing_item:item});
        })
      })
    }
  })

}

exports.getPackingItems = function(req, res) {

  ids = req.query.ids
  query = ids ? { _id: { $in: ids } } : {}

  PackingItem.find(query , function(err, items){
    if (err) {
		res.status(500).json({errors:[err.message]})
	}
    else {
		res.json({packing_items: items})
	}
  })

}
