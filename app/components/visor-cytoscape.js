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
          'border-color': '#333'
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
      elements: {
        "nodes": [
          {"data": {"id": 0, "name": "Nodo 0"}},
          {"data": {"id": 1, "name": "Nodo 1"}},
          {"data": {"id": 2, "name": "Nodo 2"}},
          {"data": {"id": 3, "name": "Nodo 3"}},
          {"data": {"id": 4, "name": "Nodo 4"}},
          {"data": {"id": 5, "name": "Nodo 5"}}
        ],
        "edges": [
          {"data": {"source": 0, "target": 1, "tipoDeRelacion": "prueba"}},
          {"data": {"source": 1,"target": 2,"tipoDeRelacion": "lala"}},
          {"data": {"source": 1, "target": 4, "tipoDeRelacion": "con_propiedad"}},
          {"data": {"source": 3,"target": 1,"tipoDeRelacion": "asdasd"}}
        ]
      }

    });

    this.set('visualizacion', visualizacion);

    // this._recargarDatos();
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
    this._visualizacion().json({ 'elements': nuevoEstado });
  },

  _visualizacion(){
    return this.get('visualizacion');
  }

});