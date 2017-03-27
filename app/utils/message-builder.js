import Ember from "ember";

let MessageBuilder = function messageBuilder(nombreDelRecurso) {

  let _propiedades = {recurso: nombreDelRecurso};

  this.withProperty = function(propertyName, propertyValue){
    _propiedades[propertyName] = propertyValue;
    return this;
  };

  this.withObject = function(emberObject){
    let nombresDePropiedades = Object.keys(emberObject);
    let propiedadesDelObjeto = emberObject.getProperties(nombresDePropiedades);
    _propiedades = Ember.merge(_propiedades, propiedadesDelObjeto);
    return this;
  };

  this.build = function(){
    var message = Ember.Object.create(_propiedades);
    return message;
  };
};

MessageBuilder.createFor = function(nombreDelRecurso){
  return new MessageBuilder(nombreDelRecurso);
};

export default MessageBuilder;
