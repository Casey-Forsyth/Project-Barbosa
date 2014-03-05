var AuthenticatorController = Ember.SimpleAuth.Authenticators.Base.extend({

  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve(properties);
    });
  },

  authenticate: function(credentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.post("/login", credentials).done(function(data) {
        if(data.loggedIn) {
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
        console.log('invalidate result:');
        console.log(data);

        if(data.loggedOut) {
          resolve(data);
        } else {
          console.log('reject');
          reject(data);
        }
      });
    });
  }

});

module.exports = AuthenticatorController;
