import Ember from "ember";
import NavigatorInjected from "../mixins/navigator-injected";

export default Ember.Route.extend(NavigatorInjected, {
  beforeModel: function() {
    this.navigator().navigateToProceduresList();
  }
});
