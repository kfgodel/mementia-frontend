import Ember from "ember";
import ProcedureServiceInjected from "../../mixins/procedure-service-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";
import ProcedureSearchStarted from "../../messages/procedure-search-started";
import ProcedureSearchStopped from "../../messages/procedure-search-stopped";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(ProcedureServiceInjected, MessagerInjected, AuthenticatorInjected, NavigatorInjected, {
  actions: {
    createNew: function() {
      this.promiseWaitingFor(this.procedureService().createProcedure())
        .whenSucceeded(Ember.run.bind(this, this.onProcedureCreated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showProceduresMatching(clickedTag);
    }
  },

  //PRIVATE
  onProcedureCreated(createdTo){
    this.navigator().navigateToProcedureEdit(createdTo);
  },
  onReauthenticated(){
    this.navigator().navigateToProceduresList();
  },
  showProceduresMatching(clickedTag) {
    this.navigator().navigateToProceduresListFilteringBy(clickedTag);
  },
  init(){
    this._super(...arguments);
    this.messager().subscribe(ProcedureSearchStarted.exampleMessage, ()=>{
      this.set('currentlyLoading', true);
    });
    this.messager().subscribe(ProcedureSearchStopped.exampleMessage, ()=>{
      this.set('currentlyLoading', false);
    });
  },
  willDestroy(){
    this.messager().unsubscribe(ProcedureSearchStarted.exampleMessage);
    this.messager().unsubscribe(ProcedureSearchStopped.exampleMessage);
    return this._super();
  }
});
