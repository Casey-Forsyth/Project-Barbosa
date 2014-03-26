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

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: function(){return '_id'},
});

App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    openModal: function(modalName, tripid, model) {
      if (!model) {
        modelType = this.get('store').modelFor(modalName)
        model = this.get('store').createRecord(modelType, {trip_id_number: tripid})
      }
      this.controllerFor(modalName).set('model', model);
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    },
    closeModal: function() {
      $('modal-backdrop fade').removeClass('in')
      return this.disconnectOutlet( {
        outlet: 'modal',
        parentView: 'application'
      });
    },
  }
});

App.Store = require('./store'); // delete if you don't want ember-data

module.exports = App;
