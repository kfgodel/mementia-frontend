import Ember from "ember";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import Application from "../concepts/application";

export default Ember.Controller.extend(AuthenticatorInjected, {
  application: Application.create(),
  actions: {
    logIn: function() {
      this.requestLogin();
    }
  },

  // PRIVATE
  credentials(){
    return this.get('model');
  },
  requestLogin(){
    var credentials = this.credentials();
    return this.promiseWaitingFor(this.authenticator().login(credentials))
      .whenSucceeded(Ember.run.bind(this, this.onSuccessfulLogin))
      .whenUnauthorized(Ember.run.bind(this, this.onBadCredentials))
      .whenFailed(Ember.run.bind(this, this.onRequestError));
  },
  onSuccessfulLogin(){
    this.changeErrorMessage("");
  },
  onBadCredentials(){
    this.changeErrorMessage("Invalid credentials");
  },
  onRequestError(response){
    var errorMessage = `Unknown error: ${response.status} - ${response.statusText}`;
    this.changeErrorMessage(errorMessage);
  },
  changeErrorMessage(newMessage){
    this.set("errorMessage", newMessage);
  }
});
