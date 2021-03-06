import Ember from "ember";
import MessageBuilder from "../utils/message-builder";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los procedures
 */
export default Ember.Service.extend(MessageServiceInjected, {

  crearNodo(){
    let message = new MessageBuilder('CREAR/nodo')
      .build();
    return this._send(message);
  },
  borrarNodo(parametros){
    let message = new MessageBuilder('BORRAR/nodo')
      .withObject(parametros)
      .build();
    return this._send(message);
  },
  setPropiedadEnNodo(parametros){
    let message = new MessageBuilder('SET/propiedad_de_nodo')
      .withObject(parametros)
      .build();
    return this._send(message);
  },
  quitarPropiedadDeNodo(parametros){
    let message = new MessageBuilder('QUITAR/propiedad_de_nodo')
      .withObject(parametros)
      .build();
    return this._send(message);
  },

  crearRelacion(parametros){
    let message = new MessageBuilder('CREAR/relacion')
      .withObject(parametros)
      .build();
    return this._send(message);
  },
  borrarRelacion(parametros){
    let message = new MessageBuilder('BORRAR/relacion')
      .withObject(parametros)
      .build();
    return this._send(message);
  },
  setPropiedadEnRelacion(parametros){
    let message = new MessageBuilder('SET/propiedad_de_relacion')
      .withObject(parametros)
      .build();
    return this._send(message);
  },
  quitarPropiedadDeRelacion(parametros){
    let message = new MessageBuilder('QUITAR/propiedad_de_relacion')
      .withObject(parametros)
      .build();
    return this._send(message);
  },

  buscarGrafo() {
    let message = new MessageBuilder('GET/grafo')
      .build();
    return this._send(message);
  },

  ejecutarQuery(query) {
    let message = new MessageBuilder('EJECUTAR/query')
      .withProperty('query', query)
      .build();
    return this._send(message);
  },
  ejecutarGroovy(codigo) {
    let message = new MessageBuilder('EJECUTAR/groovy')
      .withProperty('codigo', codigo)
      .build();
    return this._send(message);
  },

  // PRIVATE
  _send(message){
    return this.messageService().sendMessage(message);
  }

});