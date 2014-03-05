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

var CustomAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
  restore: function(properties) {
    console.log('restore called:');
    console.log(properties);
  },
  authenticate: function(credentials) {
    console.log('auth called with options');
    console.log(credentials);
    var _this = this;
    
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.post("/login", credentials).done(function(data) {
        console.log(data);

        if(data.loggedIn) {
          resolve(data);
        } else {
          reject(data);
        }

        //resolve({loggedin: true});
      });
    });
  },
  invalidate: function() {
    console.log('invalidate called');
  }
});

App.initializer({
  name: 'authentication',
  initialize: function(container, application) {
    container.register('app:authenticators:custom', CustomAuthenticator);
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

