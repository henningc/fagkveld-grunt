var gulp = require('gulp'),
	clean = require('gulp-clean'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	cssmin = require('gulp-cssmin'),
	header = require('gulp-header'),
	moment = require('moment'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	express = require('express'),
	lrserver = require('tiny-lr')(),
	livereload = require('connect-livereload'),
	refresh = require('gulp-livereload');

// template for file banner
var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
	'<%= today("YYYY-MM-DD") %>\n' +
	'* Copyright (c) <%= today("YYYY") %> ' +
	'<%= pkg.author.name %> */\n';

var glob = {
	scripts: 'app/scripts/**/*.js',
	styles: 'app/styles/less/*.less',
	html: 'app/**/*.html',
	dist: 'app/dist'
};

var server = express();
var port = 5000;
var lrport = 35729; // default livereload port

// Registering middleware to inject livereload script
// With the livereload script injected you don't need the browser plugin.
server.use(livereload({ port: lrport }));

// Adding X-SourceMap header to .js file response. Need this because gulp-uglify
// currently does not generate the required source map comments
server.use(function(req, res, next){
	if(req.url.indexOf('.js', req.url.length - '.js'.length) !== -1){
		res.setHeader('X-SourceMap', '/dist/app.min.js.map');	
	}
	next();
});

// Serving static files from the app folder
server.use(express.static('./app'));

// Starting the web and livereload servers. 
gulp.task('server', ['watch'], function() {
	server.listen(port);
	lrserver.listen(lrport);
});

// Watches for file changes and running the relevant tasks on change.
gulp.task('watch', function() {
	gulp.watch(glob.scripts, ['scripts']);
	gulp.watch(glob.styles, ['styles']);
	gulp.watch(glob.html, ['html']);
});

// Helper task to notify livereload server of html file changes
gulp.task('html', function() {
	return gulp.src(glob.html)
		// Notifying lrserver of file changes.
		.pipe(refresh(lrserver));
});

// Cleans the dist directory
gulp.task('clean', function() {
	return gulp.src(glob.dist)
		.pipe(clean());
});

// Compiles less and minifies css. 
gulp.task('styles', function() {
	return gulp.src(glob.styles)
		.pipe(less())
		.pipe(cssmin())
		// Injecting banner into the minified file
		.pipe(header(banner, {
			pkg: require('./package.json'),
			today: function(pattern) {
				return moment().format(pattern)
			}
		}))
		// suffixing the minified file with .min
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(glob.dist))
		.pipe(refresh(lrserver));
});

gulp.task('scripts', function() {
	return gulp.src(glob.scripts)
		// Suffixing with .min here instead of renaming later
		.pipe(concat('app.min.js'))
		// We don't need the concatenated file if we have a source map.
		.pipe(uglify({ outSourceMap: true }))
		.pipe(gulp.dest(glob.dist))
		.pipe(refresh(lrserver));
});

// If you want to ensure that the dependent tasks finishes before the next one is run, 
// remember to return the stream or a promise from them.
gulp.task('default', ['clean', 'styles', 'scripts']);