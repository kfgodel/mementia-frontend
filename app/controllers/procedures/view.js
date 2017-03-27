import Ember from "ember";
import ProcedureServiceInjected from "../../mixins/procedure-service-injected";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(ProcedureServiceInjected, AuthenticatorInjected, NavigatorInjected, {
  actions: {
    editModel() {
      this.transitionToRoute('procedures.edit', this.model);
    },
    deleteModel() {
      this.promiseWaitingFor(this.procedureService().removeProcedure(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showProceduresMatching(clickedTag);
    },
    goBack(){
      this.navigator().navigateToProceduresList();
    }
  },
  // PRIVATE
  onModelRemoved: function(){
    this.navigator().navigateToProceduresList();
  },
  onReauthenticated(){
    this.navigator().navigateToProcedureView(this.model);
  },
  showProceduresMatching(tagToFilter) {
    this.navigator().navigateToProceduresListFilteringBy(tagToFilter);
  }

});
