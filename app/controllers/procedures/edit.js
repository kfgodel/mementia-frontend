import Ember from "ember";
import ProcedureServiceInjected from "../../mixins/procedure-service-injected";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(ProcedureServiceInjected, AuthenticatorInjected, NavigatorInjected, {
  actions: {
    saveModel: function() {
      this.promiseWaitingFor(this.procedureService().updateProcedure(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelUpdated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    deleteModel: function(){
      this.promiseWaitingFor(this.procedureService().removeProcedure(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    cancelEdition: function(){
      this.goBackToViewOnly();
    }
  },
  // PRIVATE
  onModelUpdated: function(updatedTo){
    this.model.setProperties(updatedTo);
    this.goBackToViewOnly();
  },
  onProcedureRemoved: function(){
    this.navigator().navigateToProceduresList();
  },
  goBackToViewOnly: function(){
    this.navigator().navigateToProcedureView(this.model);
  },
  onReauthenticated(){
    this.navigator().navigateToProcedureEdit(this.model);
  },

});
