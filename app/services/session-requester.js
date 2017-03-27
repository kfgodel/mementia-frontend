import Ember from "ember";
import ResourceLocatorInjected from "ateam-ember-resource/mixins/resource-locator-injected";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * This class knows how to request backend sessions or end them
 */
export default Ember.Service.extend(ResourceLocatorInjected, MessageServiceInjected, {

  beginSession(credentials){
    var loginUrl = this.resourceLocator().loginUrl();
    var loginPayload = {
      j_username: credentials.get('login'),
      j_password: credentials.get('password')
    };
    return Ember.$.post(loginUrl, loginPayload);
  },

  endSession(){
    var logoutUrl = this.resourceLocator().logoutUrl();
    return Ember.$.post(logoutUrl, {});
  },

  getCurrentSession(){
    let message = new MessageBuilder('GET/session')
      .build();
    return this.messageService().sendMessage(message);
  },

});
