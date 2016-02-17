import Ember from 'ember';
import Preference from '../../models/preference';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON('commands.json').then((data) => {
      return data.map((item) => {
        return new Preference(item);
      });
    });
  }
});
