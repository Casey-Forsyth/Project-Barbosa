var mongoose = require('mongoose');

var itineraryItemSchema = new mongoose.Schema({
  title:        {type: String, default: ''},
  description:  {type: String, default: ''},
  location_name: {type: String, default: ''},
  scheduled_at:  {type: Date, default: null},
  latitude:     {type: Number, default: 49.89},
  longitude:    {type: Number, default: -97.1},
});

module.exports.model = mongoose.model('ItineraryItem', itineraryItemSchema);
module.exports.schema = itineraryItemSchema;
