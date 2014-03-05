var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');

gulp.task('clean', function() {
	gulp.src('app/dist')
		.pipe(clean());
});

gulp.task('less', function() {
	gulp.src('app/styles/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['clean']);