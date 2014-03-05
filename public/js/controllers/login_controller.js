var LoginController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  loginFailed: false,
  isProcessing: false,
  errors: [],

  actions: {
    // Called via form submit
    authenticate: function() {
      var credentials = {
        action: 'login',
        email: $('#email').val(),
        password: $('#password').val()
      };
      this.set('loginFailed', false);
      this.set('isProcessing', true);
      this._super(credentials);
    },

    // Send user to index on success.
    sessionAuthenticationSucceeded: function() {
      this.set('loginFailed', false);
      this.set('isProcessing', false);
      this.transitionToRoute('index');
    },

    // Display errors on login fail.
    sessionAuthenticationFailed: function(errors) {
      this.set('loginFailed', true);
      this.set('isProcessing', false);
      this.set('errors', errors);
    }

  }

});

module.exports = LoginController;
