import Ember from "ember";

/**
 * This Mixin adds a the authenticator as an injected dependency
 */
export default Ember.Mixin.create({
  searcher(){
    return this.get('globalSearcher');
  },
  // PRIVATE
  globalSearcher: Ember.inject.service('global-searcher'),
});