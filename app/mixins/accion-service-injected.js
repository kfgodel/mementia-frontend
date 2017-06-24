import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de acciones ejecutables
 */
export default Ember.Mixin.create({
  _accionService: Ember.inject.service('accion-service'),
  accionService(){
    return this.get('_accionService');
  },
});
