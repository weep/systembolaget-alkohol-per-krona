var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var injectfile = require('gulp-inject-file');
var babelConfig = require("./babelconfig.json");

gulp.task('default', function () {
});

gulp.task('build', ["clean"], function () {
    return gulp.src("src/**/*.js")
        //.pipe(inject(gulp.src("src/header.js"), {
        //    starttag: '/* swag */',
        //    endtag: '/* endinject */'
        //}))
        .pipe(injectfile({
            pattern: '// inject:<filename> //'
        }))
        .pipe(babel(babelConfig))
        .pipe(gulp.dest("dist"));
});

gulp.task('clean', function () {
    gulp.src("tmp", { read: false }).pipe(clean());
    return gulp.src("dist", { read: false }).pipe(clean());
});
