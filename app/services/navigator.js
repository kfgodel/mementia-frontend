import Ember from "ember";
import TransitionerInjected from "ateam-ember-supplement/mixins/transitioner-injected";

/**
 * This type represents the application navigator that knows how to navigate to different sections of the applications
 * requiring the needed arguments in each case.
 *   This class abstracts ember routes and adds semantic specific to this app
 */
export default Ember.Service.extend(TransitionerInjected, {
  navigateToEngageSession(){
    this._navigateTo('engaging-session');
  },
  navigateToLogin(){
    this._navigateTo('login');
  },
  navigateToIndex(){
    this._navigateTo('index');
  },
  navigateToEditarBaseGrafo(){
    this._navigateTo('editar-base-grafo');
  },
  navigateToEditarBaseRelacional(){
    this._navigateTo('editar-base-relacional');
  },

  navigateToUsers(){
    this._navigateTo('users');
  },
  navigateToUsersEdit(user){
    this._navigateTo('users.edit', user);
  },


  // PRIVATE
  _navigateTo(routeName, models, queryParams){
    this.transitioner().transitionTo(routeName, models, queryParams);
  }
});