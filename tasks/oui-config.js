/*jslint node: true */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var _ = require('lodash');
var fs = require('fs');
var templateFilePath = __dirname + '/templates/template.html';
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'Siebel Config';

module.exports = function gulpOuIConfig(moduleName, configuration) {
  var templateFile;
  var stream;
  var defaults;

  defaults = {
    createModule: true,
    environment: null,
    parser: null
  };

  templateFile = fs.readFileSync(templateFilePath, 'utf8');
  configuration = configuration || {};
  configuration = _.merge({}, defaults, configuration);

  stream = through.obj(function(file, encoding, callback) {
    var constants = [];
    var templateOutput;
    var jsonObj;

    if (!configuration.parser) {
      configuration.parser = 'json';
    }

    if (configuration.parser === 'json') {
      try {
        jsonObj = file.isNull() ? {} :
          JSON.parse(file.contents.toString('utf8'));
      } catch (e) {
        this.emit('error', new PluginError(PLUGIN_NAME,
          'invaild settings.json file provided'));
      }
    } else {
      this.emit('error', new PluginError(PLUGIN_NAME,
          configuration.parser + ' is not supported as a valid parser'));
    }

    if (!_.isPlainObject(jsonObj)) {
      this.emit('error', new PluginError(PLUGIN_NAME,
          'invalid JSON object provided'));
    }

    // select the environment in the configuration
    if (configuration.environment &&
      jsonObj.hasOwnProperty(configuration.environment)) {
      jsonObj = jsonObj[configuration.environment];
    }

    jsonObj = _.merge({}, jsonObj, configuration.constants || {});

    _.each(jsonObj, function(value, key) {
      constants.push({
        name: key,
        value: JSON.stringify(value).slice(1, -1)
      });
    });

    templateOutput = _.template(templateFile)({
      createModule: configuration.createModule,
      moduleName: moduleName,
      constants: constants
    });

    file.path = gutil.replaceExtension(file.path, '.js');
    file.contents = new Buffer(templateOutput);
    this.push(file);
    callback();
  });

  return stream;
};
