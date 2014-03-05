var LoginController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  email: '',
  password: '',

  loginFailed: false,
  isProcessing: false,

  actions: {
    // Called via form submit
    authenticate: function() {
      var credentials = {
        email: this.email,
        password: this.password
      };
      this._super(credentials);
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

