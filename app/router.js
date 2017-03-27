import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('login');
  this.route('engaging-session');

  this.route('users', function(){
    this.route('edit', { path: "edit/:user_id" });
  });

  this.route('procedures', function () {
    this.route('view', {path: "view/:procedure_id"});
    this.route('edit', {path: "edit/:procedure_id"});
    this.route('filter');
  });

  // Catches all the malformed urls (not matching previous routes)
  this.route('wrong-paths', { path: '/*badUrl' });
});

export default Router;
