var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

gulp.task('inject', function () {
    console.log('Injecting bower files');
    gulp.src('./app/index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(inject(gulp.src('./app/css/*.css', {read: false})))
    .pipe(inject(gulp.src('./app/app.js', {read: false})))
    .pipe(gulp.dest('./'));
})

gulp.task('build', ['inject'], function() {
    console.log('Building HTML');
})

gulp.task('serve', ['inject'], function() {
    browserSync.init({
        server: './'
    });
    gulp.watch('./app/index.html', ['build']);
    gulp.watch(['./index.html', './app/css/*.css', './app/app.js']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);