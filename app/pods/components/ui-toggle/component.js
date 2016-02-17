import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'toggle', 'checkbox'],
  checked: false,
  label: Ember.computed('checked', function() {
    if (this.get('checked')) {
      return 'On';
    }
    return 'Off';
  }),

  change() {
    this.sendAction('action', this.get('item'));
  }
});
