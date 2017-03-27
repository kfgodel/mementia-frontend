import Ember from "ember";
import TagSplitter from "ateam-ember-supplement/utils/tag-splitter";

export default Ember.Object.extend({
  tagList: Ember.computed('tags', function() {
    var tags = this.get('tags');
    var tagArray = new TagSplitter().split(tags);
    return tagArray;
  })
});