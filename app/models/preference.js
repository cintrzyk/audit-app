/* globals require */
import Ember from 'ember';
const ipcRenderer = require('electron').ipcRenderer;

export default Ember.Object.extend({
  init() {
    this.sync();
  },

  enabled: false,
  loading: false,

  toggleAction: Ember.computed('enabled', function() {
    if (this.get('enabled')) {
      return 'enable';
    }
    return 'disable';
  }),

  toggle() {
    const action = this.get('toggleAction');
    return this._runCommand(action);
    // TODO handle error and revert state
  },

  sync() {
    return this._runCommand('status');
    // TODO handle error and revert state
  },

  _runCommand(action) {
    this.set('loading', true);
    return new Ember.RSVP.Promise((resolve, reject) => {
      const command = this.get('command');
      const result = ipcRenderer.sendSync('run-command', { action, command });

      if (result === 1) {
        return reject('Command failed.');
      }

      const { enabled, output } = result;

      this.set('enabled', enabled);
      this.set('loading', false);

      resolve(output);
    });
  }
});
