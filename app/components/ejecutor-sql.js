import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseRelacionalServiceInjected from "../mixins/base-relacional-service-injected";

export default Ember.Component.extend(BaseRelacionalServiceInjected, Sizeable, {
  actions: {
    ejecutarStatement() {
      this.set('resultado', undefined);
      let codigo = this.get('codigoSql');
      this.baseRelacionalService().ejecutarSqlStatement(codigo)
        .then((respuesta)=>{
          this.set('resultado', respuesta.get('resultado'));
        });
    }
  }
});
