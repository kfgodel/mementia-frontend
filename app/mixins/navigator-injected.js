import Ember from "ember";

/**
 * Adds the navigator as an internal collaborator
 */
export default Ember.Mixin.create({
  navigatorService: Ember.inject.service('navigator'),
  navigator(){
    return this.get('navigatorService');
  },
});