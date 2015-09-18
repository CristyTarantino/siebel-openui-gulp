/*jslint node: true */
'use strict';

module.exports = function(gulp, plugins, paths, isDevelopment) {
  gulp.task('styles_vendor', function() {
    return gulp.src(paths.styles_vendor.src)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(paths.styles_vendor.dest))
      // livereload if is in development
      .pipe(plugins.if(isDevelopment, plugins.livereload({})));
  });
};
