import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import ProcedureServiceInjected from "../../mixins/procedure-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Route.extend(AuthenticatedRoute, ProcedureServiceInjected, NavigatorInjected, {
  model: function(params){
    var procedureId = params.procedure_id;

    return this.promiseWaitingFor(this.procedureService().getProcedure(procedureId))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToProcedureView(procedureId);
      });
  },
  // PRIVATE
});
