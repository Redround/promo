var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");
		cssimport 		 = require("gulp-cssimport");

// Скрипты проекта

gulp.task('scripts', function() {
	return gulp.src([
		'assets/template/app/libs/jquery_2.2.4/jquery-2.2.js',
		'assets/template/app/libs/jquery-ui/jquery-ui.min.js',
		'assets/template/app/libs/slick/slick.min.js',
		'assets/template/app/libs/magnific-popup/jquery.magnific-popup.js'
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('assets/template/app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'assets/template/app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('assets/template/app/sass/**/*.sass')
	.pipe(sass().on("error", notify.onError()))
	.pipe(rename({suffix: '', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS())
	.pipe(gulp.dest('assets/template/app/css'))
	.pipe(browserSync.reload({stream: true}));
});

var options = {};

gulp.task("cssimport", function() {
    return gulp.src([
					'assets/template/app/libs/fontawesome/font-awesome.min.css',
					'assets/template/app/libs/slick/slick.css',
					'assets/template/app/libs/slick/slick-theme.css',
					'assets/template/app/libs/magnific-popup/magnific-popup.css'
				])
        .pipe(cssimport(options))
				.pipe(concat('libs.css'))
				.pipe(gulp.dest('assets/template/app/css'))
				.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'scripts', 'cssimport', 'browser-sync'], function() {
	//gulp.watch('assets/template/app/css/libs.css', ['cssimport']);
	gulp.watch('assets/template/app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'assets/template/app/js/common.js'], ['scripts']);
	gulp.watch('assets/template/app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('assets/template/app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img'));
});


gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts', 'cssimport'], function() {

	var buildFiles = gulp.src([
		'assets/template/app/*.html',
		'assets/template/app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'assets/template/app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildImportCss = gulp.src([
			'assets/template/app/css/libs.css',
			]).pipe(gulp.dest('dist/css'));

	var buildCommonJs = gulp.src([
		'assets/template/app/js/common.js',
		]).pipe(gulp.dest('dist/js'));

	var buildJs = gulp.src([
		'assets/template/app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'assets/template/app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
