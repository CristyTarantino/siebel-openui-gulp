/*jslint node: true */

(function() {
  'use strict';

  var gulp = require('gulp');
  var plugins = require('gulp-load-plugins')();
  var runSequence = require('run-sequence');
  var del = require('del');

  var environment = require('./tasks/environment')(plugins);
  var isDevelopment = environment === 'development';
  var paths = require('./tasks/paths')(isDevelopment, environment);

  require('./tasks/svgs')(gulp, plugins, paths, isDevelopment);
  require('./tasks/styles')(gulp, plugins, paths, isDevelopment);
  require('./tasks/scripts')(gulp, plugins, paths, isDevelopment, environment);
  require('./tasks/styles_vendor')(gulp, plugins, paths, isDevelopment);
  require('./tasks/scripts_vendor')(gulp, plugins, paths, isDevelopment);

  require('./tasks/code-quality')(gulp, paths);

  require('./tasks/server')(gulp, plugins);

  // require('./tasks/deploy')(gulp, plugins, environment);

  gulp.task('watch', function() {
    gulp.watch([paths.scripts.src, 'settings.json'], ['scripts']);
    gulp.watch([paths.styles.src], ['styles']);
    gulp.watch([paths.svgs.src], ['svgs']);
    gulp.watch([paths.scripts_vendor.src], ['scripts_vendor']);
    gulp.watch([paths.styles_vendor.src], ['styles_vendor']);
    plugins.livereload.listen();
  });

  gulp.task('clean_dist', function(callback) {
    if (isDevelopment) {
      var destinations = [];
      for (var variable in paths) {
        if (paths.hasOwnProperty(variable)) {
          destinations.push(paths[variable].dest);
        }
      }
      del(destinations, callback);
    } else {
      del('dist/' + environment + '/**/*', callback);
    }
  });

  gulp.task('build', [
      'scripts',
      'styles',
      'svgs',
      'styles_vendor',
      'scripts_vendor'
    ], function() {
    gulp.src('/');
  });

  gulp.task('default', function() {
    if (isDevelopment) {
      runSequence('clean_dist', 'build', 'watch', 'server');
    } else {
      runSequence('clean_dist', 'build');
      // Remove line above and uncomment line below for auto-deployment
      // runSequence('clean_dist', 'build', 'deploy');
    }
  });
}());
