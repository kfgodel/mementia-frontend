import Ember from "ember";
import Sizeable from "tenpines-material-components/mixins/materialize/sizeable";
import BaseGrafoServiceInjected from "../mixins/base-grafo-service-injected";
/* global Alchemy */

export default Ember.Component.extend(BaseGrafoServiceInjected, Sizeable, {
  classNames: ['alchemy'],
  idDelVisor: Ember.computed('elementId', function(){
    return this.get('elementId')+'_visor';
  }),

  didInsertElement() {
    this._super(...arguments);

    let alchemy = new Alchemy();
    this.set('alchemy', alchemy);

    this._recargarDatos();
  },

  actions:{
    actualizarGrafo(){
      this._recargarDatos();
    }
  },

  _recargarDatos(){
    this.baseGrafoService().buscarGrafo()
      .then((estadoGrafo)=>{
        this._actualizarVisualizacion(estadoGrafo);
      });
  },

  _actualizarVisualizacion(nuevoEstado){
    let estadoParaAlchemy = JSON.parse(JSON.stringify(nuevoEstado));

    var config = {
      divSelector: '#'+ this.get('idDelVisor'),
      dataSource: estadoParaAlchemy,
      graphHeight: function(){ return 600; },
      // graphWidth: function(){ return 600; },

//      linkDistance: function(){ return 40; },

//      nodeTypes: {"node_type": ["Maintainer", "Contributor"]},
//      caption: function(node){ return node.caption; }
    };

    let alchemy = this.get('alchemy');
    alchemy.begin(config);
  },


});