import Ember from "ember";
import NavigatorInjected from "../mixins/navigator-injected";

/**
 * This class knows how to navigate the app screens so the authenticator can make the user authenticate
 * or wait for a session recovery with a feedback screen
 */
export default Ember.Service.extend(NavigatorInjected, {

  goToLoginScreen(){
    this.navigator().navigateToLogin();
  },

  goToInitialScreen(){
    this.navigator().navigateToIndex();
  },

  goToSessionRecoveryScreen(){
    this.navigator().navigateToEngageSession();
  }

});
