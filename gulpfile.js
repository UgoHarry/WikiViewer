var gulp = require ('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var wiredep =require ('wiredep').stream;
var browserSync = require ('browser-sync').create();
var runSequence = require('run-sequence');

var $ = gulpLoadPlugins();


/*************TASKS***************/

//COMPILING SASS
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe($.plumber())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
      stream:true
  }));
});

//LIVE-RELOADING
gulp.task('browserSync', function () {
    browserSync.init({
        server : {
            baseDir: 'app'
        }
    });
});

//WATCHING FOR CHANGES
gulp.task('watch', function() {
    runSequence('browserSync', 'sass', function () {
        gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/js/**.*.js', browserSync.reload);
    });
});

//LOADING SCRIPTS INTO PRODUCTION READY PAGE
gulp.task('useref', function() {
    return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.uglifycss({
        "maxLineLen" : 80,
        "uglyComments": true
    })))
    .pipe(gulp.dest('dist'));
});

//LOAD FRONT-END DEPENDENCIES INTO PROD PAGE
gulp.task('bower', function () {
    gulp.src ('dist/index.html')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist'));
});

//CLEANING UP FILES
gulp.task('clean:dist', function() {
    del.sync('dist');
});

//BUILDING OPTIMISED FILES FOR PRODUCTION
gulp.task ('build', function() {
    runSequence('clean:dist', ['sass', 'useref'], 'bower', function() {
        console.log('Building files...');
    });
});
