// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
var react = require('gulp-react');
var reactify = require('reactify');
var autoprefixer = require('gulp-autoprefixer');
// var bundle = browserify('./resources/js/application.js').bundle();

// Compile Our Sass
gulp.task('styles', function() {
  return sass('resources/css/scss/styles.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles complete' }));
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//   return gulp.src('resources/js/**/*.js')
//     .pipe(concat('Application.jsx'))
//     .pipe(gulp.dest('resources/js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('resources/js'))
//     .pipe(notify({ message: 'Scripts complete' }));
// });

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./resources/js/application.js'], // Only need initial file, browserify finds the deps
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    bundler.transform(reactify);
    var watcher  = watchify(bundler);

    return watcher
      .on('update', function () { // When any files update
          watcher.bundle() // Create new bundle that uses the cache for high performance
          .pipe(source('application.js'))
        //   .pipe(rename({suffix: '.min'}))
        //   .pipe(uglify())
          .pipe(gulp.dest('./public/javascripts'));
      })
      .bundle() // Create the initial bundle when starting the task
      .pipe(source('application.js'))
      .pipe(gulp.dest('./public/javascripts'))
      .pipe(notify({ message: 'browserify complete' }));
});

// gulp.task('components', function() {
//   return gulp.src('resources/js/components/*.js')
//     .pipe(concat('application.js'))
//     .pipe(react())
//     .pipe(gulp.dest('public/javascripts'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('public/javascripts'))
//     .pipe(notify({ message: 'Scripts complete' }));
// });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['resources/js/*.js', 'resources/js/**/*.js'], ['browserify']);
    gulp.watch(['resources/css/scss/*.scss', 'resources/css/scss/**/*.scss'], ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'browserify']);
