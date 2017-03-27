import Ember from "ember";
import UserServiceInjected from "../../mixins/user-service-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(UserServiceInjected, MessagerInjected, AuthenticatorInjected, NavigatorInjected, {
  actions: {
    save: function() {
      this.promiseWaitingFor(this.userService().updateUser(this.user()))
        .whenSucceeded(Ember.run.bind(this, this.onUserUpdated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    remove: function(){
      this.promiseWaitingFor(this.userService().removeUser(this.user()))
        .whenSucceeded(Ember.run.bind(this, this.onUserRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    }
  },

  // PRIVATE
  user: function(){
    return this.get('model');
  },
  onUserUpdated: function(updatedUser){
    this.user().setProperties(updatedUser);
    this.navigator().navigateToUsers();
  },
  onUserRemoved: function(){
    this.messager().publish({ type: 'userRemoved', removedUser: this.user()});
    this.navigator().navigateToUsers();
  },
  onReauthenticated(){
    this.navigator().navigateToUsersEdit(this.user());
  }
});
