var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var header = require('gulp-header');
var moment = require('moment');

var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
	'<%= today("YYYY-MM-DD") %>\n' +
	'* Copyright (c) <%= today("YYYY") %> ' +
	'<%= pkg.author.name %> */\n';

gulp.task('clean', function() {
	gulp.src('app/dist')
		.pipe(clean());
});

gulp.task('less', function() {
	gulp.src('app/styles/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/dist'));
});

gulp.task('cssmin', function() {
	gulp.src(['app/dist/*.css', '!app/dist/*.min.css'])
		.pipe(cssmin())
		.pipe(header(banner, {
			pkg: require('./package.json'),
			today: function(pattern) {
				return moment().format(pattern)
			}
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/dist'));
})

gulp.task('default', ['clean']);