import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import UserServiceInjected from "../mixins/user-service-injected";
import NavigatorInjected from "../mixins/navigator-injected";

export default Ember.Route.extend(AuthenticatedRoute, UserServiceInjected, NavigatorInjected, {
  model: function(){
    return this.promiseWaitingFor(this.userService().getAllUsers())
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToUsers();
      });
  },
  // PRIVATE
});
