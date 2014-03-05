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

    // handle login success
    sessionAuthenticationSucceeded: function() {
      this.transitionToRoute('index');
    },

    // display an error when logging in fails
    sessionAuthenticationFailed: function(message) {
      console.log('auth error:');
      console.log(message);
    }

  }

});

module.exports = LoginController;
