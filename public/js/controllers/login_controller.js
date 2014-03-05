var LoginController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  email: '',
  password: '',

  loginFailed: false,
  isProcessing: false,
  errors: [],

  actions: {

    // Called via form submit
    authenticate: function() {
      var credentials = {
        email: this.get('email'),
        password: this.get('password')
      };
      this._super(credentials);
    },

    // Send user to index on success.
    sessionAuthenticationSucceeded: function() {
      this.transitionToRoute('index');
    },

    // Display errors on login fail.
    sessionAuthenticationFailed: function(errors) {
      this.set('loginFailed', true);
      this.set('errors', errors);
    }

  }

});

module.exports = LoginController;
