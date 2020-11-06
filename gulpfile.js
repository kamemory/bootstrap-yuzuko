const Gulp = require('gulp');
const Del = require('del');
const sass = require('gulp-sass');
const BrowserSync = require("browser-sync").create();

Gulp.task('css:build', () => {
	return Gulp.src(['scss/**/*.scss'])
		.pipe(sass({
			includePaths: ['node_modules/'],
			outputStyle: 'expanded',
			sourceMap: true,
			sourceMapContents: true,
			precision: 6
		}))
		.pipe(Gulp.dest("dist/yuzuko/css"))
		.pipe(BrowserSync.stream());
});

Gulp.task('css:clean', () => {
	return Del(['dist/yuzuko/css/**/*']);
});

Gulp.task('css', Gulp.series('css:build'));

Gulp.task('js:copy', () => {
	return Gulp.src([
		'bootstrap/dist/js/**/*.js',
		'bootstrap/dist/js/**/*.map',
	], { cwd: 'node_modules' })
		.pipe(Gulp.dest('dist/yuzuko/js'));
});

Gulp.task('docs:reload', () => {
	BrowserSync.reload();
});

Gulp.task('build', Gulp.series(
	'css:clean', Gulp.parallel('css', 'js:copy')
));

Gulp.task('docs:serve', () => {
	BrowserSync.init({
		server: 'dist/',
		port: 9094
	});
});

Gulp.task('watch', () => {
	Gulp.watch(['scss/**/*'], Gulp.series('css'));
	Gulp.watch(['dist/**/*']).on('change', BrowserSync.reload);
});

Gulp.task('serve', Gulp.series('build', Gulp.parallel('docs:serve', 'watch')));

Gulp.task('release', Gulp.series('build'));

Gulp.task('default', Gulp.parallel('build'));
