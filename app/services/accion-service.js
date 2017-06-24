import Ember from "ember";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";
import AccionEjecutable from "../concepts/accion-ejecutable";

/**
 * Esta clase permite interactuar con el backend a traves de acciones reificadas
 */
export default Ember.Service.extend(MessageServiceInjected, {

  ejecutarAccion(recurso, parametros){
    let builder = new MessageBuilder(recurso);
    if(parametros){
      builder.withObject(parametros);
    }
    let message = builder
      .build();
    return this._send(message);
  },

  buscarAccionesDisponibles(){
    let message = new MessageBuilder('LISTAR/acciones')
      .build();
    return this._send(message, AccionEjecutable);
  },

  // PRIVATE
  _send(message, tipoEsperado){
    return this.messageService().sendMessage(message, tipoEsperado);
  }

});