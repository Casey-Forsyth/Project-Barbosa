var mongoose = require('mongoose');
var ItineraryItem = require('./ItineraryItem');

var tripSchema = new mongoose.Schema({
  name: String,
  itinerary: [ItineraryItem.schema]
});

module.exports = mongoose.model('Trip', tripSchema);
