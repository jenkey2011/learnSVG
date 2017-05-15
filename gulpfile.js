var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
	autoprefixer = require('gulp-autoprefixer');

var rootSrc = 'src/';
var rootDist = 'dist/'

var jsSrc = rootSrc + 'js/*.js';
var jsDist = rootDist + 'js';

var cssSrc = rootSrc + 'css/*.scss';
var libsCssSrc = rootSrc + 'css/*.css';
var cssDist = rootDist + 'css';

var htmlSrc = [rootSrc + 'html/*/*.html',rootSrc + 'html/*.html'];
var htmlDist = rootDist;

var imgSrc = rootSrc + 'img/*.{png,jpg}';
var imgDist = rootDist + 'img';


gulp.task('runJs', function(){
	gulp.src(jsSrc)
		.pipe(gulp.dest(jsDist))
		.pipe(connect.reload())
});

gulp.task('runSass', function () {
	gulp.src(cssSrc)
	  	.pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: 'compact'}).on('error',sass.logError))
	    .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
	    .pipe(sourcemaps.write('../css'))
	    .pipe(gulp.dest(cssDist))
	    .pipe(connect.reload())
});

gulp.task('runCss',function(){
	gulp.src(libsCssSrc)
		.pipe(gulp.dest(cssDist))
		.pipe(connect.reload())
})

gulp.task('runHtml', function(){
	gulp.src(htmlSrc)
		.pipe(gulp.dest(htmlDist))
		.pipe(connect.reload())
});

gulp.task('runImage', function(){
	gulp.src(imgSrc)
		.pipe(imagemin({
			progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
		}))
		.pipe(gulp.dest(imgDist))
})

gulp.task('moveImg',function(){
	gulp.src(imgSrc)
		.pipe(gulp.dest(imgDist))
})

gulp.task('runConnect', function(){
	connect.server({
		livereload:true
	});
});

gulp.task('copyFile',  function() {
  return gulp.src(copySrc)
    		 .pipe(gulp.dest(copyDist))
});

gulp.task('watch', function(){
	gulp.watch(htmlSrc, ['runHtml']);
	gulp.watch(cssSrc, ['runSass']);
	gulp.watch(jsSrc, ['runJs']);
	gulp.watch(imgSrc, ['moveImg']);
})


gulp.task('default',['runJs','runSass','runCss','runHtml','moveImg','runConnect','watch'])