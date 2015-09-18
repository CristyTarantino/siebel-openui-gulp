/*jslint node: true */
'use strict';

module.exports = function(isDevelopment, environment) {
  // Destination folder is dist if the environment is not development
  var distFolderName = isDevelopment ? '' : '/dist/' + environment;

  var paths = {
    scripts: {
      src: [
        'js/**/*.js',
        '!js/util/**/**.js',
        '!js/3rdParty/**/**.js'
      ],
      dest: '.' + distFolderName + '/PUBLIC/enu/23030/scripts/siebel/custom'
    },
    scripts_vendor: {
      src: [
        'js/3rdParty/**/*.js'
      ],
      dest: '.' + distFolderName + '/PUBLIC/enu/23030/scripts/3rdParty/custom'
    },
    styles: {
      src: [
        'scss/**/*.scss',
        '!scss/config/**/*.scss',
        '!scss/3rdParty/**/**.scss'
      ],
      dest: '.' + distFolderName + '/PUBLIC/enu/files/custom'
    },
    styles_vendor: {
      src: [
        'scss/3rdParty/**/*.scss'
      ],
      dest: '.' + distFolderName + '/PUBLIC/enu/files/3rdParty/custom'
    },
    svgs: {
      src: 'PUBLIC/enu/IMAGES/**/*.svg',
      dest: '.' + distFolderName + '/PUBLIC/enu/templates'
    }
  };

  return paths;
};
