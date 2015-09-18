/*jslint node: true */
'use strict';

var lazypipe = require('lazypipe');

module.exports = function(gulp, plugins, paths, isDevelopment) {
  var getSpriteSvg = lazypipe()
    .pipe(function() {
      return plugins.svgSprite({
        shape: {
          id: {
            separator: '_'
          }
        },
        mode: {
          symbol: {
            sprite: 'sprite_icons.svg',
            inline: true,
            template: 'sprite_icons.svg',
            dest: '.'
          }
        },
        xmlDeclaration: false,
        doctypeDeclaration: false
      });
    })
    .pipe(function() {
      return plugins.if(isDevelopment, plugins.cleanDest(paths.svgs.dest));
    });

  gulp.task('svgs', function() {
    return gulp.src(paths.svgs.src)
      .pipe(plugins.plumber())
      .pipe(getSpriteSvg())
      .pipe(gulp.dest(paths.svgs.dest))
      .pipe(plugins.if(isDevelopment, plugins.livereload({})));
  });
};
