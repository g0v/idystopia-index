const gulp = require('gulp');
const pug = require('gulp-pug');
const data = require('gulp-data');
const connect = require('gulp-connect');
const fs = require('fs');

gulp.task('server', function () {
    connect.server({
        port: 3000,
        livereload: true,
        root: 'static'
    })
    gulp.src('src/**/index.pug').pipe(data(function(file) {
      console.log("[build] "+file['history']);
      return JSON.parse(fs.readFileSync('data/index.json'));
    })).pipe(pug()).pipe(gulp.dest('./static/')).pipe(connect.reload());

    gulp.watch(['src/**/*.pug', 'static/assets/css/*.css', 'static/assets/js/*.js', 'data/*.json'], function(event){
      gulp.src('src/**/index.pug').pipe(data(function(file) {
        console.log("[build] "+file['history']);
        return JSON.parse(fs.readFileSync('data/index.json'));
      })).pipe(pug()).pipe(gulp.dest('./static/')).pipe(connect.reload());
      event();
    });
});

gulp.task('build', function() {
    gulp.src('src/**/index.pug').pipe(data(function(file) {
      console.log("[build] "+file['history']);
      return JSON.parse(fs.readFileSync('data/index.json'));
    })).pipe(pug()).pipe(gulp.dest('./static/'));
});
