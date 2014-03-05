var SignupController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  signupFailed: false,
  isProcessing: false,

  actions: {
    authenticate: function() {
      var credentials = {
        action: 'signup',
        email: $('#email').val(),
        password: $('#password').val(),
        confirmPassword: $('#confirmPassword').val()
      };
      this.set('signupFailed', false);
      this.set('isProcessing', true);
      this._super(credentials);
    },

    sessionAuthenticationSucceeded: function() {
      this.set('signupFailed', false);
      this.set('isProcessing', false);
      this.transitionToRoute('index');
    },

    sessionAuthenticationFailed: function(errors) {
      console.log('errors:');
      console.log(errors);
      this.set('signupFailed', true);
      this.set('isProcessing', false);
      this.set('errors', errors);
    }

  }

});

module.exports = SignupController;

