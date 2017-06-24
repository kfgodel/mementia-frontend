import Ember from "ember";

export default Ember.Object.extend({

  estaIncompleta: Ember.computed('parametros.@each.valor', function () {
    let parametros = this._parametros();
    for (let i = 0; i < parametros.length; i++) {
      const parametro = parametros[i];
      let valor = parametro.get('valor');
      if(valor === undefined || valor === ''){
        return true;
      }
    }
    return false;
  }),

  objetoParametros: Ember.computed('parametros.@each.valor', function () {
    return this._calcularObjetoParametros();
  }),

  _parametros(){
    return this.get('parametros');
  },

  _calcularObjetoParametros(){
    let objeto = Ember.Object.create();
    let parametros = this._parametros();
    for (let i = 0; i < parametros.length; i++) {
      const parametro = parametros[i];
      let valor = parametro.get('valor');
      let propiedad = parametro.get('nombre');
      objeto.set(propiedad, valor);
    }
    return objeto;
  }

});