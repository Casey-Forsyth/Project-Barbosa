var mongoose = require('mongoose');

var itineraryItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  scheduledAt: Date,
  location: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
});

module.exports.model = mongoose.model('ItineraryItem', itineraryItemSchema);
module.exports.schema = itineraryItemSchema;
