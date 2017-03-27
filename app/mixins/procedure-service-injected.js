import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de procedimientos
 */
export default Ember.Mixin.create({
  _procedureService: Ember.inject.service('procedure-service'),
  procedureService(){
    return this.get('_procedureService');
  },
});
