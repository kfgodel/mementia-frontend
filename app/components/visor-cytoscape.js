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
          'opacity': 0.5,
          'target-arrow-shape': 'triangle',
          'source-arrow-shape': 'circle',
        })
        .selector('edge.questionable').css({
          'line-style': 'dotted',
          'target-arrow-shape': 'diamond'
        }),
      elements: {
        nodes: [
          { data: { id: 'j', name: 'Jerry'} },
          { data: { id: 'e', name: 'Elaine'} },
          { data: { id: 'k', name: 'Kramer'} },
          { data: { id: 'g', name: 'George'} }
        ],
        edges: [
          { data: { source: 'j', target: 'e' } },
          { data: { source: 'j', target: 'k' } },
          { data: { source: 'j', target: 'g' } },

          { data: { source: 'e', target: 'j'} },
          { data: { source: 'e', target: 'k' },  classes: 'questionable' },

          { data: { source: 'k', target: 'j'} },
          { data: { source: 'k', target: 'e'} },
          { data: { source: 'k', target: 'g'} },

          { data: { source: 'g', target: 'j'} }
        ]
      }

    });

    this.set('visualizacion', visualizacion);

    this._recargarDatos();
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




  },


});