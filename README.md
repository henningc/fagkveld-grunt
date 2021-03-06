# Gulp demo

This is a fork of [olavhaugen/fagkveld-grunt](https://github.com/olavhaugen/fagkveld-grunt) which recreates the grunt tasks from there in [Gulp JS](http://gulpjs.com/). The gruntfile is kept for reference.

This project shows how to set up the following in gulp:

- [JS concatenation](https://www.npmjs.org/package/gulp-concat)
- [JS minificaiton](https://www.npmjs.org/package/gulp-uglify)
- [LESS compilation](https://www.npmjs.org/package/gulp-less)
- [CSS minification](https://www.npmjs.org/package/gulp-cssmin)
- Watch with [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
- [Livereload server](https://www.npmjs.org/package/tiny-lr)
- [Lr connect middleware](https://www.npmjs.org/package/connect-livereload)
- [Web server](https://www.npmjs.org/package/express)

Each step can be viewed by checking out the corresponding tag.

## Getting started

To get started, you need [Node.js](http://nodejs.org/) installed.

After installing Node.js, run the following commands to install [Bower](http://bower.io/) and [Gulp](https://github.com/gulpjs/gulp) globally:

	npm install -g bower
	npm install -g gulp


Next, run the following commands from the root directory to download npm and bower packages:

	npm install
	bower install

## Gulp Tasks

#### Compile

	gulp

#### Watch with livereload

	gulp watch

#### Server with watch and livereload
	
	gulp server

## More info

- [Build Wars](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/)
- [Beyond the numbers](http://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/)
- [Getting started with Gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/)
- [Google](https://www.google.no/search?q=grunt+vs+gulp)
- etc...
