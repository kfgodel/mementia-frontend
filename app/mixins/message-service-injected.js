import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de mensajes con el backend
 */
export default Ember.Mixin.create({
  _messageService: Ember.inject.service('message-service'),
  messageService(){
    return this.get('_messageService');
  },
});
