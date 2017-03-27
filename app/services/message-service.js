import Ember from "ember";
import RequesterServiceInjected from "ateam-ember-resource/mixins/requester-service-injected";
import ResourceLocatorInjected from "ateam-ember-resource/mixins/resource-locator-injected";
import ResultEmberizer from "ateam-ember-resource/utils/result-emberizer";

/**
 * Esta clase permite comunicarse con el backend a travez de un solo endpoint (sin utilizar la convecion rest)
 */
export default Ember.Service.extend(RequesterServiceInjected, ResourceLocatorInjected, {

  sendMessage(messageContent, claseEmber) {
    let requestArgument = this._createRequest(messageContent);
    let promise = this.requesterService().makeRequest(requestArgument);
    return this._emberizer(claseEmber).emberizing(promise);
  },

  // PRIVATE
  _createRequest: function (messageContent) {
    let requestArgument = {
      method: "POST",
      url: this._resourceUrl(),
      data: JSON.stringify(messageContent)
    };
    return requestArgument;
  },

  _resourceUrl: function () {
    let resourceName = 'messages';
    return this.resourceLocator().resourceUrl(resourceName);
  },
  _emberizer(claseEmber){
    let config;
    if (claseEmber) {
      config = {claseEmber: claseEmber};
    }
    return ResultEmberizer.create(config);
  },

});