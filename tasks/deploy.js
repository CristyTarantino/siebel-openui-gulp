/*jslint node: true */
'use strict';

var fs = require('fs');
var ftp = require('vinyl-ftp');
var siebelConf = 'siebel-account.json';
var serversMap = 'crm-servers-map.json';

module.exports = function(gulp, plugins, environment) {
  var config;
  var host;

  if (fs.existsSync(siebelConf) && fs.existsSync(serversMap)) {
    config = JSON.parse(fs.readFileSync(siebelConf, 'utf8'));
    host = JSON.parse(fs.readFileSync(serversMap, 'utf8'));
    config.ftpDetails.host = host[environment];
  } else {
    plugins.util.log(plugins.util.colors.red(
      'File "siebel-account.json" not found.\n' +
      '\t   Please create and populate it with your ' +
      'Siebel server username and password.'));
    process.exit(1);
  }

  gulp.task('deploy', function() {
    var conn = ftp.create(config.ftpDetails);

    // TODO this needs further consideration in terms of deciding
    // which folders to deploy and how
    return gulp.src('dist/' + environment + '/**/*', {
        base: '.',
        buffer: false
      })
      .pipe(conn.dest('.'));
  });
};
