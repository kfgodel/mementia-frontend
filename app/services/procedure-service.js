import Ember from "ember";
import Procedure from "../resources/procedure";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los procedures
 */
export default Ember.Service.extend(MessageServiceInjected, {

  getAllProceduresMatching: function (searchText) {
    let message = new MessageBuilder('GET/procedures')
      .withProperty('searchText', searchText)
      .build();
    return this._send(message);
  },
  getProcedure: function (procedureId) {
    let message = new MessageBuilder('GET/procedure')
      .withProperty('id', procedureId)
      .build();
    return this._send(message);
  },
  createProcedure: function () {
    let message = new MessageBuilder('POST/procedure')
      .build();
    return this._send(message);
  },
  updateProcedure: function (procedure) {
    let message = new MessageBuilder('PUT/procedure')
      .withObject(procedure)
      .build();
    return this._send(message);
  },
  removeProcedure: function (procedure) {
    let message = new MessageBuilder('DELETE/procedure')
      .withProperty('id', procedure.get('id'))
      .build();
    return this._send(message);
  },

  // PRIVATE
  _send(message){
    return this.messageService().sendMessage(message, Procedure);
  }

});