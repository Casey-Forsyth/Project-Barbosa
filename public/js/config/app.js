// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data'); // delete if you don't want ember-data

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: function(){return '_id'},
});


App.Store = require('./store'); // delete if you don't want ember-data

module.exports = App;

