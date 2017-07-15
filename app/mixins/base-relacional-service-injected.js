import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de procedimientos
 */
export default Ember.Mixin.create({
  _baseRelacionalService: Ember.inject.service('base-relacional-service'),
  baseRelacionalService(){
    return this.get('_baseRelacionalService');
  },
});
