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
    }
  }

});

module.exports = SignupController;

