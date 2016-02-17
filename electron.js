/* jshint node: true */

var electron = require('electron');
var commands = require('./sys-commands/all');

var ipcMain = electron.ipcMain;
var app = electron.app;
var mainWindow = null;
var BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start();

app.on('window-all-closed', function onWindowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 600,
    minHeight: 300,
    title: 'Audit'
  });

  delete mainWindow.module;

  // If you want to open up dev tools programmatically, call
  // mainWindow.openDevTools();

  // By default, we'll open the Ember App by directly going to the
  // file system.
  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

  mainWindow.on('closed', function onClosed() {
    mainWindow = null;
  });

  ipcMain.on('run-command', function(event, options) {
    var command = options.command;
    var action = options.action;

    commands[command](action).then(function(response) {
      event.returnValue = response;
    }, function(err) {
      event.returnValue = 1;
      // TODO notify rollbar
    });
  });
});
