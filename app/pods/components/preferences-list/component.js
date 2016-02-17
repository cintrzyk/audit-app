import Ember from 'ember';

export default Ember.Component.extend({
  isItemsEmpty: Ember.computed.empty('items'),
  isNoItemsMsg: Ember.computed.and('isItemsEmpty', 'isSearchEmpty'),

  actions: {
    toggle(item) {
      item.toggle();
    }
  }
});
