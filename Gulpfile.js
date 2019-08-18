const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
var browserSync = require('browser-sync').create();

var inputTemplates = './templates/*.html';
var siteOutput = './dist';

gulp.task('nunjucks', function(done) {
    gulp.src(inputTemplates)
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(siteOutput));
    done();
});

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server:  siteOutput
    });
    gulp.watch(inputTemplates, gulp.series('nunjucks')).on('change', browserSync.reload);
    done();
});

gulp.task('default', gulp.series('nunjucks', 'browser-sync'));
