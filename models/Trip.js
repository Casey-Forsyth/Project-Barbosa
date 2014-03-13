var mongoose = require('mongoose');
var ItineraryItem = require('./ItineraryItem');

var tripSchema = new mongoose.Schema({
  name:  {type: String, default: "My Trip"},
  itinerary: [ItineraryItem.schema],
  user:{type: String, default: "None"},
  date: {type: Date, default: Date.now()},
  archived: {type: Boolean, default: false}
});

module.exports = mongoose.model('Trip', tripSchema);
