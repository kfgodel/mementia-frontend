import Ember from "ember";
import UserServiceInjected from "../mixins/user-service-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import NavigatorInjected from "../mixins/navigator-injected";

export default Ember.Controller.extend(UserServiceInjected, MessagerInjected, AuthenticatorInjected, NavigatorInjected, {
  actions: {
    create: function() {
      this.promiseWaitingFor(this.userService().createUser())
        .whenSucceeded(Ember.run.bind(this, this.onUserCreated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    }
  },
  onUserRemoved: function(removedUser){
    // Need to search by id, because 2 instance may represents the same entity
    var removedId = removedUser.get('id');
    var removedUserInList = this.userList().findBy('id', removedId);
    if (removedUserInList) {
      this.userList().removeObject(removedUserInList);
    }
  },
  // PRIVATE
  userList: function(){
    return this.get('model');
  },
  onUserCreated: function(createdUser){
    this.userList().addObject(createdUser);
    this.navigator().navigateToUsersEdit(createdUser);
  },
  onReauthenticated(){
    this.navigator().navigateToUsers();
  },
  init(){
    this._super(...arguments);
    this.messager().subscribe({type: 'userRemoved'}, (message)=>{
      this.onUserRemoved(message.removedUser);
    });
  },
  willDestroy(){
    this.messager().unsubscribe({type: 'userRemoved'});
    return this._super();
  }
});
