import Ember from "ember";

export default Ember.Object.extend({

  estaCompleto: Ember.computed('valor', function () {
    let valor = this.get('valor');
    let valorDefinido = valor !== undefined && valor !== '';
    return valorDefinido;
  }),

  componenteEditor: Ember.computed('tipo', function () {
    let tipo = this.get('tipo');
    switch (tipo){
      case 'palabra': return 'tenpines/input-text';
      case 'numero': return 'tenpines/input-number';
    }
    return 'tenpines/input-text';
  })
});