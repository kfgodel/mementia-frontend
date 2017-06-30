import Ember from "ember";
import ParametroDeAccion from "./parametro-de-accion";

export default Ember.Object.extend({

  tieneParametrosDefinidos: Ember.computed('parametrosMejorados.@each.valor', function () {
    let parametros = this.get('parametrosMejorados');
    for (let i = 0; i < parametros.length; i++) {
      const parametro = parametros[i];
      if(!parametro.get('estaCompleto')){
        return false;
      }
    }
    return true;
  }),

  parametrosMejorados: Ember.computed('parametros.[]', function () {
    return this._parametros();
  }),

  objetoParametros: Ember.computed('parametrosMejorados.@each.valor', function () {
    return this._calcularObjetoParametros();
  }),

  _parametros(){
    let parametrosOriginales = this.get('parametros');
    let parametrosMejorados = parametrosOriginales.map(function (parametro) {
      return ParametroDeAccion.create(parametro);
    });
    return Ember.A(parametrosMejorados);
  },

  _calcularObjetoParametros(){
    let objeto = Ember.Object.create();
    let parametros = this.get('parametrosMejorados');
    for (let i = 0; i < parametros.length; i++) {
      const parametro = parametros[i];
      let valor = parametro.get('valor');
      let propiedad = parametro.get('nombre');
      objeto.set(propiedad, valor);
    }
    return objeto;
  }

});