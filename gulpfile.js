// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
var react = require('gulp-react');
var autoprefixer = require('gulp-autoprefixer');

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
gulp.task('scripts', function() {
  return gulp.src('resources/js/**/*.js')
    .pipe(concat('functions.js'))
    .pipe(react())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(notify({ message: 'Scripts complete' }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['resources/js/*.js', 'resources/js/**/*.js'], ['scripts']);
    gulp.watch(['resources/css/scss/*.scss', 'resources/css/scss/**/*.scss'], ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'scripts']);
