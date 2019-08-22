const gulp = require('gulp');
const sass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks');
var browserSync = require('browser-sync').create();

var srcFiles = './templates/**/*.html';
var cssFiles = './scss/**/*.scss';
var jsFiles = './js/**/*.js';
var imgFiles = './img/**/*.*';
var watchPaths = [
    srcFiles,
    cssFiles,
    jsFiles,
    imgFiles
];
var destDir = './dist';

gulp.task('copy', function (done) {
    gulp.src('./node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest(`${destDir}/css/`));
    gulp.src(jsFiles)
        .pipe(gulp.dest(`${destDir}/js/`));
    gulp.src(imgFiles)
        .pipe(gulp.dest(`${destDir}/img/`));
    done();
});

gulp.task('scss', function(done) {
    gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${destDir}/css/`));
    done();
});

gulp.task('nunjucks', function(done) {
    gulp.src([
        srcFiles,
        '!templates/**/_*/',      //exclude folders starting with '_'
        '!templates/**/_*/**/*',  //exclude files/subfolders in folders 
    ])
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(destDir));
    done();
});

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server:  destDir
    });
    gulp.watch(watchPaths, gulp.series('copy', 'nunjucks', 'scss')).on('change', browserSync.reload);
    done();
});

gulp.task('default', gulp.series('copy', 'nunjucks', 'scss', 'browser-sync'));
