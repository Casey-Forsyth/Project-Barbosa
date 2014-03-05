// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data'); // delete if you don't want ember-data
require('../vendor/ember-simple-auth'); //for login

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

var AuthenticatorController = require('../controllers/authenticator_controller');

App.initializer({
  name: 'authentication',
  initialize: function(container, application) {
    container.register('app:authenticators:custom', AuthenticatorController);
    Ember.SimpleAuth.setup(container, application, {
      store: Ember.SimpleAuth.Stores.Cookie
    });
  }
});

App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin);

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: function(){return '_id'},
});

App.Store = require('./store'); // delete if you don't want ember-data

module.exports = App;

