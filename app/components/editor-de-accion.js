import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import AccionServiceInjected from "../mixins/accion-service-injected";

export default Ember.Component.extend(AccionServiceInjected, Sizeable, {

  accionElegida: null,

  noSePuedeEjecutar: Ember.computed('accionElegida', 'accionElegida.parametros.@each.valor',function () {
    let accionElegida = this._accionElegida();
    if(!accionElegida){
      return true;
    }
    let parametros = this._parametros();
    for (var i = 0; i < parametros.length; i++) {
      var parametro = parametros[i];
      let valor = parametro.get('valor');
      if(valor === undefined){
        return true;
      }
    }
    return false;
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
      let parametros = this._calcularObjetoParametros();
      this.accionService().ejecutarAccion(recurso, parametros)
        .then(()=>{
          this.set('mensajeDeFeedback', 'Hecho');
        });
    }
  },

  _accionElegida() {
    return this.get('accionElegida');
  },
  _parametros() {
    return this.get('accionElegida.parametros');
  },

  _calcularObjetoParametros(){
    let objeto = Ember.Object.create();
    let parametros = this._parametros();
    for (var i = 0; i < parametros.length; i++) {
      var parametro = parametros[i];
      let valor = parametro.get('valor');
      let propiedad = parametro.get('nombre');
      objeto.set(propiedad, valor);
    }
    return objeto;
  }

});
