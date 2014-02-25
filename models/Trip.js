var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
  name: String
});

tripSchema.statics = {

  /**
   * Find trip by id
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * List all trips
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
}

module.exports = mongoose.model('Trip', tripSchema);
