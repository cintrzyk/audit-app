import Ember from 'ember';

export default Ember.Controller.extend({
  search: '',
  activeTab: 1,
  isPassedScope: Ember.computed.equal('activeTab', 2),
  isIssuedScope: Ember.computed.equal('activeTab', 3),
  passedItems: Ember.computed.filterBy('model', 'enabled', true),
  issuedItems: Ember.computed.filterBy('model', 'enabled', false),
  scopedItems: Ember.computed('model.@each.enabled', 'isPassedScope', 'isIssuedScope', function() {
    if (this.get('isPassedScope')) {
      return this.get('passedItems');
    } else if (this.get('isIssuedScope')) {
      return this.get('issuedItems');
    }
    return this.get('model');
  }),
  isSearchEmpty: Ember.computed.empty('search'),
  filteredItems: Ember.computed('search', 'scopedItems', function() {
    const items = this.get('scopedItems');
    if(this.get('isSearchEmpty')) {
      return items;
    }
    return items.filter((item) => {
      return item.get('title').toLowerCase().includes(this.get('search').toLowerCase());
    });
  }),

  actions: {
    changeModelScope(tabId) {
      console.log('activeTab', tabId);
      this.set('activeTab', tabId);
    }
  }
});
