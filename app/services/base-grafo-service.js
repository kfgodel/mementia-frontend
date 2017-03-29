import Ember from "ember";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los procedures
 */
export default Ember.Service.extend(MessageServiceInjected, {

  ejecutarQuery(query) {
    let message = new MessageBuilder('EJECUTAR/query')
      .withProperty('query', query)
      .build();
    return this._send(message);
  },

  // PRIVATE
  _send(message){
    return this.messageService().sendMessage(message);
  }

});