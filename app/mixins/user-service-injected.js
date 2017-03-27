import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de usuarios
 */
export default Ember.Mixin.create({
  _userService: Ember.inject.service('user-service'),
  userService(){
    return this.get('_userService');
  },
});
