var mongoose = require('mongoose');
var ItineraryItem = require('./ItineraryItem');

var tripSchema = new mongoose.Schema({
  name:  {type: String, default: "My Trip"}
  itinerary: [ItineraryItem.schema]
  archived: {type: Boolean, default: false}
});

module.exports = mongoose.model('Trip', tripSchema);
