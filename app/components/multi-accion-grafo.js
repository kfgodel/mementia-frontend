import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import AccionServiceInjected from "../mixins/accion-service-injected";

export default Ember.Component.extend(AccionServiceInjected, Sizeable, {

  accionElegida: null,

  accionElegidaChanged: Ember.observer('accionElegida', function () {
    this.set('respuesta', null);
  }),

  sePuedeEjecutar: Ember.computed('accionElegida.tieneParametrosDefinidos',function () {
    if(!this.get('accionElegida')){
      return false;
    }
    return this.get('accionElegida.tieneParametrosDefinidos');
  }),

  init(){
    this._super(...arguments);
    this._actualizarAcciones();
  },

  _actualizarAcciones(){
    let parametros = Ember.Object.create({
      tagEsperado: 'base-de-grafos'
    });
    this.accionService().buscarAccionesDisponibles(parametros)
      .then((metadataDeAcciones)=>{
        this.set('accionesDisponibles', metadataDeAcciones.get('acciones'));
      });
  },

  actions: {
    ejecutarAccion: function () {
      let recurso = this.get('accionElegida.recurso');
      let parametros = this.get('accionElegida.objetoParametros');
      this.set('respuesta', null);
      this.accionService().ejecutarAccion(recurso, parametros)
        .then((respuesta)=>{
          this.set('respuesta', respuesta);
        });
    }
  },

});
