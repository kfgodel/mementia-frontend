import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de procedimientos
 */
export default Ember.Mixin.create({
  _baseGrafoService: Ember.inject.service('base-grafo-service'),
  baseGrafoService(){
    return this.get('_baseGrafoService');
  },
});
