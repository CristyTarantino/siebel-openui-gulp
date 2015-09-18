/*jslint node: true */
'use strict';

var lazypipe = require('lazypipe');

module.exports = function(gulp, plugins, paths, isDevelopment, environment) {
  var getScripts = lazypipe()
    // jshint
    .pipe(function() {
      return plugins.if(isDevelopment, plugins.jshint());
    })
    // jscs
    .pipe(function() {
      return plugins.if(isDevelopment, plugins.jscs({
        fix: true,
        preset: 'google',
        requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties'
      }));
    })
    // combine errors
    .pipe(function() {
      return plugins.if(isDevelopment,
        plugins.jscsStylish.combineWithHintResults());
    })
    // and show them colorfull in the console
    .pipe(function() {
      return plugins.if(isDevelopment,
        plugins.jshint.reporter('jshint-summary', {
        verbose: true
      }));
    })
    // and add sourcemaps
    .pipe(plugins.sourcemaps.init)
    // if environment is not development minify js
    .pipe(function() {
      return plugins.if(!isDevelopment, plugins.uglify({
        compress: {
          negate_iife: false
        }
      }));
    })
    .pipe(function() {
      return plugins.sourcemaps.write('./');
    });

  // Create OpenUI custom settings file and add it to the js folder
  gulp.task('settings', function() {
    gulp.src('settings.json')
      .pipe(require('./oui-config')('SiebelApp.Settings', {
        environment: environment
      }))
      .pipe(gulp.dest('js/'));
  });

  gulp.task('scripts', ['settings'], function() {
    return gulp.src(paths.scripts.src)
      .pipe(plugins.plumber())
      // execute the chain script
      .pipe(getScripts())
      .pipe(gulp.dest(paths.scripts.dest))
      // livereload if is in development
      .pipe(plugins.if(isDevelopment, plugins.livereload({})));
  });
};
