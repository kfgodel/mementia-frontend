import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {
  actions: {
    ejecutarGroovy() {
      this.set('resultadoGroovy', undefined);
      let codigo = this.get('codigoGroovy');
      this.baseGrafoService().ejecutarGroovy(codigo)
        .then((respuesta)=>{
          this.set('resultadoGroovy', respuesta.get('resultado'));
        });
    }
  }
});
