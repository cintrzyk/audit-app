var shelljs = require('shelljs');
shelljs.config.silent = true;
var Promise = require('rsvp').Promise;

module.exports = function(command) {
  return new Promise(function(resolve, reject) {
    switch (command) {
      case 'status':
        shelljs.exec('defaults read com.apple.screensaver askForPassword', function(code, stdout, stderr) {
          var output = stdout.trim();
          if (code !== 0) {
            return reject(stderr);
          }
          if (output === '1') {
            return resolve({ enabled: true, output: output });
          }
          resolve({ enabled: false, output: output });
        });
        break;
      case 'enable':
        shelljs.exec('defaults write com.apple.screensaver askForPassword -int 1', function(code, stdout, stderr) {
          var output = stdout.trim();
          if (code !== 0) {
            return reject(stderr);
          }
          return resolve({ enabled: true, output: output });
        });
        break;
      case 'disable':
        shelljs.exec('defaults write com.apple.screensaver askForPassword -int 0', function(code, stdout, stderr) {
          var output = stdout.trim();
          if (code !== 0) {
            return reject(stderr);
          }
          return resolve({ enabled: false, output: output });
        });
        break;
      default:
        console.log('run with status|enable|disable');
    }
  });
}
