import Ember from "ember";
import Resolver from "./resolver";
import loadInitializers from "ember-load-initializers";
import config from "./config/environment";
import Application from "./concepts/application";

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  LOG_TRANSITIONS: true,
  //LOG_TRANSITIONS_INTERNAL: true // Log route hooks and transition
});

loadInitializers(App, config.modulePrefix);

// Make browser tab use the dynamic app name
document.title = new Application().get('displayName');

export default App;
