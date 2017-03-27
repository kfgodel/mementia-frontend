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
  /**
   * Moves the user to the procedures list. It doesn't force a model refresh
   */
  navigateToProceduresList(){
    this._navigateTo('procedures.filter');
  },
  /**
   * Moves the user to the procedures list indicating a new query param that refreshes the model
   * @param filterText the text to filter procedures
   */
  navigateToProceduresListFilteringBy(filterText){
    this._navigateTo('procedures.filter', undefined, {filterText: filterText});
  },
  navigateToProcedureView(procedure){
    this._navigateTo('procedures.view', procedure);
  },
  navigateToProcedureEdit(procedure){
    this._navigateTo('procedures.edit', procedure);
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