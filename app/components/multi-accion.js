import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {

  accionElegida: null,

  didInsertElement(){
    this._super(...arguments);
    this.baseGrafoService().buscarAccionesDisponibles()
      .then((metadataDeAcciones)=>{
        this.set('accionesDisponibles', metadataDeAcciones.get('acciones'));
      });
  },

  actions: {
    ejecutarAccion: function () {
      this.set('mensajeDeFeedback', 'Elegida: ' + this.get('accionElegida.nombre'));
    }
  }
});
