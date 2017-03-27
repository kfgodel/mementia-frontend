import Ember from "ember";
import NavigatorInjected from "../mixins/navigator-injected";

export default Ember.Service.extend(NavigatorInjected, {
  searchExpression: '',
  search(){
    var filterText = this.get('searchExpression');
    this.navigator().navigateToProceduresListFilteringBy(filterText);
  }
});
