var mongoose = require('mongoose');

var packingItemSchema = new mongoose.Schema({
  name: String
});

module.exports.model = mongoose.model('PackingItem', packingItemSchema);
module.exports.schema = packingItemSchema;
