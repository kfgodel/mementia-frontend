import Ember from "ember";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los procedures
 */
export default Ember.Service.extend(MessageServiceInjected, {

  ejecutarSqlStatement(statement) {
    let message = new MessageBuilder('EJECUTAR/sql-statement')
      .withProperty('statement', statement)
      .build();
    return this._send(message);
  },

  // PRIVATE
  _send(message){
    return this.messageService().sendMessage(message);
  }

});