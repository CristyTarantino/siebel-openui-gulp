/*jslint node: true */
'use strict';

var lazypipe = require('lazypipe');

module.exports = function(gulp, plugins, paths, isDevelopment) {
  var getCss = lazypipe()
    // lint scss
    .pipe(function() {
      return plugins.if(isDevelopment, plugins.scssLint({
        // 'maxBuffer': 99999999,
        'config': 'scss-lint.yml'
      }));
    })
    // add sourcemaps
    .pipe(function() {
      return plugins.sourcemaps.init({
        loadMaps: true
      });
    })
    // process sass
    .pipe(function() {
      return plugins.sass({
        precision: 10,
        sourcemap: true
      })
      .on('error', plugins.sass.logError);
    })
    // add autoprefixers
    .pipe(function() {
      return plugins.autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      });
    })
    // minify css if is not development
    .pipe(function() {
      return plugins.if(!isDevelopment, plugins.minifyCss());
    })
    .pipe(function() {
      return plugins.sourcemaps.write('./');
    });

  gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
      .pipe(plugins.plumber())
      // execute the chain script
      .pipe(getCss())
      .pipe(gulp.dest(paths.styles.dest))
      // livereload if is in development
      .pipe(plugins.if(isDevelopment, plugins.livereload({})));
  });
};
