import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {
  parametros: Ember.Object.create(),
  actions: {
    crearRelacion: function () {
      this.set('mensajeDeFeedback', null);
      let parametros = this.get('parametros');
      this.baseGrafoService().crearRelacion(parametros)
        .then((creado)=>{
          this.set('mensajeDeFeedback', 'Relacion creada: ' + creado.get('id'));
        });
    }
  }
});
