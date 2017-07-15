import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseRelacionalServiceInjected from "../mixins/base-relacional-service-injected";

export default Ember.Component.extend(BaseRelacionalServiceInjected, Sizeable, {
  codigoSql: 'SELECT * FROM Usuario',

  trajoResultados: Ember.computed('resultadoDeQuery',function(){
    return this.get('resultadoDeQuery') !== undefined;
  }),

  actions: {
    ejecutarStatement() {
      this.set('resultadoDeQuery', undefined);
      let codigo = this.get('codigoSql');
      this.baseRelacionalService().ejecutarSqlStatement(codigo)
        .then((respuesta)=>{
          this.set('resultadoDeQuery', respuesta.get('resultados'));
        });
    }
  }
});
