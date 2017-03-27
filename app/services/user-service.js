import Ember from "ember";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los usuarios
 */
export default Ember.Service.extend(MessageServiceInjected, {

  getAllUsers: function () {
    let message = new MessageBuilder('GET/users')
      .build();
    return this._send(message);
  },
  createUser: function () {
    let message = new MessageBuilder('POST/user')
      .build();
    return this._send(message);
  },
  getUser: function (userId) {
    let message = new MessageBuilder('GET/user')
      .withProperty("id", userId)
      .build();
    return this._send(message);
  },
  updateUser: function (user) {
    let message = new MessageBuilder('PUT/user')
      .withObject(user)
      .build();
    return this._send(message);
  },
  removeUser: function (user) {
    let message = new MessageBuilder('DELETE/user')
      .withProperty('id', user.get('id'))
      .build();
    return this._send(message);
  },
  // PRIVATE
  _send(message){
    return this.messageService().sendMessage(message);
  }

});