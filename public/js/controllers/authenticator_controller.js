var AuthenticatorController = Ember.SimpleAuth.Authenticators.Base.extend({

  restore: function(properties) {
    console.log('restore called:');
    console.log(properties);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve(properties);
    });
  },

  authenticate: function(credentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.post("/login", credentials).done(function(data) {
        console.log('authenticate result:');
        console.log(data);

        if(data.loggedIn) {
          resolve(data);
        } else {
          console.log('reject');
          reject(data);
        }
      });
    });
  },

  invalidate: function() {
    console.log('invalidate called');

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
