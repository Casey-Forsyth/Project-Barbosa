var AuthenticatorController = Ember.SimpleAuth.Authenticators.Base.extend({
  restore: function(properties) {
    console.log('restore called:');
    console.log(properties);
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

        //resolve({loggedin: true});
      });
    });
  },
  invalidate: function() {
    console.log('invalidate called');
  }
});

module.exports = AuthenticatorController;
