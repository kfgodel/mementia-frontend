import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";

export default Ember.Component.extend(Sizeable, {
  tipoDeComponente: Ember.computed('tipoEsperado', function () {
    let tipo = this.get('tipoEsperado');
    switch (tipo){
      case 'palabra': return 'tenpines/input-text';
      case 'numero': return 'tenpines/input-number';
      case 'texto': return 'tenpines/text-area';
      case 'ResultadoEjecucionGroovy': return 'tenpines/text-area';
    }
    return 'tenpines/text-area';
  }),

  expresion: Ember.computed('tipoEsperado','respuesta', function () {
    let tipo = this.get('tipoEsperado');
    switch (tipo){
      case 'ResultadoEjecucionGroovy': return 'respuesta.resultado';
    }
    return null;
  }),

  value: Ember.computed('expresion', function () {
    let expresion = this.get('expresion');
    if(expresion !== null){
      return this.get(expresion);
    }
    return JSON.stringify(this.get('respuesta'));
  }),

});