import Ember from "ember";
import SearcherInjected from "../mixins/searcher-injected";

export default Ember.Component.extend(SearcherInjected, {
  actions:{
    search(){
      this.searcher().search();
    }
  },
  // PRIVATE
});
