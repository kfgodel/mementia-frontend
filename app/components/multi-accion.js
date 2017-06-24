import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import AccionServiceInjected from "../mixins/accion-service-injected";

export default Ember.Component.extend(AccionServiceInjected, Sizeable, {

  accionElegida: null,

  faltaAccionEjecutable: Ember.computed('accionElegida.estaIncompleta',function () {
    if(!this.get('accionElegida')){
      return true;
    }
    return this.get('accionElegida.estaIncompleta');
  }),

  init(){
    this._super(...arguments);
    this._actualizarAcciones();
  },

  _actualizarAcciones(){
    this.accionService().buscarAccionesDisponibles()
      .then((metadataDeAcciones)=>{
        this.set('accionesDisponibles', metadataDeAcciones.get('acciones'));
      });
  },

  actions: {
    ejecutarAccion: function () {
      let recurso = this.get('accionElegida.recurso');
      let parametros = this.get('accionElegida.objetoParametros');
      this.accionService().ejecutarAccion(recurso, parametros)
        .then(()=>{
          this.set('mensajeDeFeedback', 'Hecho');
        });
    }
  },

});
