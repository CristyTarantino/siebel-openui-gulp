/*jslint node: true */
'use strict';

var plato = require('plato');

module.exports = function(gulp, paths) {
  gulp.task('code-quality', function() {
    plato.inspect(
      paths.scripts.src,
      './reports/code-quality',
      function() {});
  });
};
