import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";
/* global cytoscape */

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {
  idDelVisor: Ember.computed('elementId', function () {
    return this.get('elementId') + '_visor';
  }),

  didInsertElement() {
    this._super(...arguments);

    let visualizacion = cytoscape({

      container: document.getElementById(this.get('idDelVisor')),

      layout: {
        name: 'cose'
      },

      style: cytoscape.stylesheet()
        .selector('node').css({
          'width': 40,
          'content': 'data(name)',
          'text-valign': 'center',
          'text-outline-width': 1,
          'color': '#fff'
        })
        .selector(':selected').css({
          'border-width': 2,
          'border-color': '#196dbc'
        })
        .selector('edge').css({
          'curve-style': 'bezier',
          'content': 'data(tipoDeRelacion)',
          'opacity': 0.5,
          'target-arrow-shape': 'triangle',
          'source-arrow-shape': 'circle',
        })
        .selector('edge.questionable').css({
          'line-style': 'dotted',
          'target-arrow-shape': 'diamond'
        }),


    });

    this.set('visualizacion', visualizacion);
    this._recargarDatos();
  },

  willDestroyElement(){
    this._visualizacion().destroy();
    this.set('visualizacion', null);
  },

  actions: {
    actualizarGrafo(){
      this._recargarDatos();
    }
  },

  _recargarDatos(){
    this.baseGrafoService().buscarGrafo()
      .then((estadoGrafo) => {
        this._actualizarVisualizacion(estadoGrafo);
      });
  },

  _actualizarVisualizacion(nuevoEstado){
    let nuevaConfig = { 'elements': nuevoEstado };
    let visualizacion = this._visualizacion();
    visualizacion.json(nuevaConfig);
    visualizacion.layout({name: 'cose'}).run();
    visualizacion.fit();
  },

  _visualizacion(){
    return this.get('visualizacion');
  }

});