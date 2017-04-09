import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {
  query: 'MATCH (n) RETURN n;',
  trajoResultados: Ember.computed('resultadoDeQuery',function(){
    return this.get('resultadoDeQuery') !== undefined;
  }),

  actions: {
    buscarQuery() {
      this.set('resultadoDeQuery', undefined);
      let query = this.get('query');
      this.baseGrafoService().ejecutarQuery(query)
        .then((resultadoDeQuery)=>{
          this.set('resultadoDeQuery', resultadoDeQuery);
        });
    },
  }
});
