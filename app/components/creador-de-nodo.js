import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {
  actions: {
    crearNodo: function () {
      this.set('mensajeDeFeedback', null);
      this.baseGrafoService().crearNodo()
        .then((creado)=>{
          this.set('mensajeDeFeedback', 'Nodo creado: ' + creado.get('id'));
        });
    }
  }
});
