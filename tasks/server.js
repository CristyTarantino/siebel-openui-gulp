/*jslint node: true */
'use strict';

var fs = require('fs');
var siebelConf = 'siebel-account.json';

module.exports = function(gulp, plugins) {
  var config;

  if (fs.existsSync(siebelConf)) {
    config = JSON.parse(fs.readFileSync(siebelConf, 'utf8'));
  } else {
    plugins.util.log(plugins.util.colors.red(
      'File "siebel-account.json" not found.\n' +
      '\t   Please create and populate it with your ' +
      'Siebel server username and password.'));
    process.exit(1);
  }

  gulp.task('server', function() {
    return gulp.src('', {
      read: false
    })
    .pipe(plugins.plumber())
    .pipe(plugins.shell([
      '"C:\\Siebel\\Client_1\\BIN\\siebel.exe" ' +
      '-c "C:\\Siebel\\Client_1\\bin\\enu\\media_OpenUI.cfg" ' +
      '-b "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" ' +
      '-d LOCAL -u ' + config.username +
      ' -p ' + config.password
    ]))
    .on('end', function() {
      plugins.util.log(plugins.util.colors.yellow(
        'Server session terminated!!!'));
      process.exit(1);
    });
  });
};
