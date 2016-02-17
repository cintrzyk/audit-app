import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'two', 'steps'],
  issues: Ember.computed.filterBy('items', 'enabled', false),
  success: Ember.computed.empty('issues')
});
