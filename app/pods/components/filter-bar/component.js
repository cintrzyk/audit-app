import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'secondary', 'pointing', 'menu'],
  term: '',
  tabs: [
    Ember.Object.create({ id: 1, name: 'All', active: true }),
    Ember.Object.create({ id: 2, name: 'Passed', active: false }),
    Ember.Object.create({ id: 3, name: 'Issues', active: false })
  ],
  tabsObserver: Ember.observer('activeTab', function() {
    this.get('tabs').setEach('active', false);
    this.get('tabs').findBy('id', this.get('activeTab')).set('active', true);
  }),
  actions: {
    tabClicked(tab) {
      this.set('activeTab', tab.get('id'));
    }
  }
});
