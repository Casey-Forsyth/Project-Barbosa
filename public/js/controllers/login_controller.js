var LoginController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  email: '',
  password: '',

  loginFailed: false,
  isProcessing: false,

  actions: {

    authenticate: function() {
      console.log('authenticate');
      var options = {
        email: this.email,
        password: this.password
      };
      this._super(options);
    },

    // display an error when logging in fails
    sessionAuthenticationFailed: function(message) {
      console.log('auth error:');
      console.log(message);
    },

    // handle login success
    sessionAuthenticationSucceeded: function() {
      console.log('auth succ');
    }
  }

});

module.exports = LoginController;

