import Ember from "ember";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";

export default Ember.Controller.extend(BaseGrafoServiceInjected, {
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
    ejecutarGroovy() {
      this.set('resultadoGroovy', undefined);
      let codigo = this.get('codigoGroovy');
      this.baseGrafoService().ejecutarGroovy(codigo)
        .then((respuesta)=>{
          this.set('resultadoGroovy', respuesta.get('resultado'));
        });
    }
  },

});
