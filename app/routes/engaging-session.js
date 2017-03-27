import Ember from "ember";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";


export default Ember.Route.extend(AuthenticatorInjected, {
  model(){
    return this.authenticator().startSessionRecovery();
  },
});