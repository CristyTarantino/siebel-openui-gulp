/*jslint node: true */
'use strict';

module.exports = function(gulp, plugins, paths, isDevelopment) {
  gulp.task('scripts_vendor', function() {
    return gulp.src(paths.scripts_vendor.src)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(paths.scripts_vendor.dest))
      // livereload if is in development
      .pipe(plugins.if(isDevelopment, plugins.livereload({})));
  });
};
