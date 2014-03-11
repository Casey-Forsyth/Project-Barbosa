// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data'); // delete if you don't want ember-data

var App = Ember.Application.create();
App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: function(){return '_id'},
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    openModal: function(modalName) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    }
  }
});


App.Store = require('./store'); // delete if you don't want ember-data

module.exports = App;

