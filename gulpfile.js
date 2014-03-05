var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

gulp.task('clean', function() {
	gulp.src('app/dist')
		.pipe(clean());
});

gulp.task('less', function() {
	gulp.src('app/styles/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/dist'));
});

gulp.task('cssmin', function(){
	gulp.src(['app/dist/*.css', '!app/dist/*.min.css'])
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/dist'));
})

gulp.task('default', ['clean']);