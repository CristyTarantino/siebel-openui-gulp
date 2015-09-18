/*jslint node: true */
'use strict';

var fs = require('fs');
var serversMap = 'crm-servers-map.json';

module.exports = function(plugins) {
  // Get environment from cli -e flag
  var environment = plugins.util.env.e;

  // OUI valid environments
  var validEnvironments = ['development'];
  var environments;

  if (fs.existsSync(serversMap)) {
    environments = JSON.parse(fs.readFileSync(serversMap, 'utf8'));

    for (var envName in environments) {
      if (environments.hasOwnProperty(envName)) {
        validEnvironments.push(envName);
      }
    }
  } else {
    plugins.util.log(plugins.util.colors.red(
      'File "crm-servers-map.json" not found.\n'));
    process.exit(1);
  }

  // If the environment specified is not a valid one
  // default it to development
  if (validEnvironments.indexOf(environment) === -1) {
    plugins.util.log(plugins.util.colors
      .yellow('Environment not correctly specified, ' +
      'defaulting to "development".'));
    environment = 'development';
  }

  return environment;
};
