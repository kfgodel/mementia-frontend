import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import ProcedureServiceInjected from "../../mixins/procedure-service-injected";
import SearcherInjected from "../../mixins/searcher-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";
import ProcedureSearchStarted from "../../messages/procedure-search-started";
import ProcedureSearchStopped from "../../messages/procedure-search-stopped";
import NavigatorInjected from "../../mixins/navigator-injected";


export default Ember.Route.extend(AuthenticatedRoute, ProcedureServiceInjected, SearcherInjected, MessagerInjected, NavigatorInjected, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever the query param changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    // Because the queyParam is not available to the searcher we let it know its value (needed when this route is accessed by url)
    this.communicateQueryParamToSearcher(filterText);

    return this.promiseWaitingFor(this.procedureService().getAllProceduresMatching(filterText))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToProceduresListFilteringBy(filterText);
      });
  },
  actions: {
    // Triggered while loading procedures
    loading(transition) {
      this.messager().publish(new ProcedureSearchStarted());
      transition.promise.finally(()=>{
        this.messager().publish(new ProcedureSearchStopped());
      });
    }
  },
  // PRIVATE
  communicateQueryParamToSearcher(filterParam){
    this.searcher().set('searchExpression', filterParam);
  }
});