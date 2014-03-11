var AuthenticatorController = Ember.SimpleAuth.Authenticators.Base.extend({

  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve(properties);
    });
  },

  authenticate: function(credentials) {
    var _this = this;
    var path = null;

    if(credentials.action == 'login') {
      path = '/login';
    } else {
      path = '/signup';
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.post(path, credentials).done(function(data) {
        if(data.isAuthenticated) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  },

  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.get("/logout").done(function(data) {
        if(data.loggedOut) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

});

module.exports = AuthenticatorController;

