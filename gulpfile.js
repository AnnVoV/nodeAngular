var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    minifycss = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

var paths = {
    stylus: ['public/stylus/*.styl'],
    css: ['stylus/css/*.css'],
    js:['public/src/js/*.js']
};

//stylus to css
gulp.task('stylus', function() {
    return gulp.src(paths.stylus)
        .pipe(stylus({linenos: false}))
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulp.dest('public/css'))
        .pipe(minifycss())
        .pipe(gulp.dest('public/build/css'));
});

//img to base64 gulp-base64
/*gulp.task('base64', function(){
 return gulp.src(paths.css)
 .pipe(base64())
 .pipe(gulp.dest('dist/css'))
 });*/


//uglify
gulp.task('js', function() {
    var config = {
        mangle: {except: ['define', 'require', 'module', 'exports']},
        compress: false
    };
    gulp.src(paths.js)
        .pipe(uglify(config))
        .pipe(gulp.dest('public/build/js'));
});


gulp.task('watch', function() {
    gulp.watch(paths.stylus, ['stylus']);
});

gulp.task('default', ['stylus']);