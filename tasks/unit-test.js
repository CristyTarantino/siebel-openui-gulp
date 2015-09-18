/*jslint node: true */
'use strict';

// gulp.task('test', function() {
//   gulp.src(paths.scripts)
//     .pipe(plumber())
//     .pipe(istanbul({
//       includeUntested: true
//     })) // Covering files
//     .pipe(istanbul.hookRequire()) // Force `require` to return covered files
//     .on('finish', function() {
//       gulp.src(['./test/spec/*.js'])
//         .pipe(istanbul.writeReports({
//           dir: './reports/unit_test_coverage',
//           reporters: ['html', 'text-summary', 'text'],
//           reportOpts: {
//             dir: './reports/unit_test_coverage'
//           }
//         })) // Creating the reports after tests runned
//         .pipe(karma({
//           dieOnError: false,
//           background: false,
//           configFile: 'karma.conf.js',
//           action: 'run'
//         }))
//         // Make sure failed tests cause gulp to exit non-zero
//         .on('error', function(err) {
//           this.emit('end'); //instead of erroring the stream, end it
//         });
//     });
// });
