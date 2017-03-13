var gulp = require('gulp')
var webserver = require('gulp-webserver')
var stylus = require('gulp-stylus')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var nib = require('nib')
var minifyCss  = require('gulp-minify-css')
var concatCss = require('gulp-concat-css')
var notify = require('gulp-notify')


gulp.task('server', function() {
  gulp.src('./build')
    .pipe(webserver({
      host: '127.1.1.0',
      port: 8080,
      fallback: 'index.html',
      livereload: true
    }))
})

gulp.task('css', function () 
{
  gulp.src('./src/css/*.css')
    .pipe(concatCss("build.css"))
    .pipe(minifyCss({keepBreaks:false}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(notify("Ha finalizado task css!"));
});

gulp.task('js', function() {
  browserify({
    entries: './src/js/app.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/js'))
  .pipe(notify("Ha finalizado task js!"));
})

gulp.task('watch', function() {
  gulp.watch('./src/js/*.jsx', ['js'])
  gulp.watch('./src/css/*.css', ['css'])
})

gulp.task('default', ['server', 'watch'])
