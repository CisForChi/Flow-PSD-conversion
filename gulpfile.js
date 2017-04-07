const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const plugin = autoprefixer({ grid: false });


gulp.task('styles', () => {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'], grid: false}))
    .pipe(gulp.dest('./styles'))
     .pipe(reload({stream: true}));
});


gulp.task('scripts', () => {
  gulp.src('./main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./styles/scripts'))
      .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('./styles/**/*.scss', ['styles']);
  gulp.watch('./scripts/main.js', ['scripts']);
   gulp.watch('*.html', reload);
});
gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});

gulp.task('default',['browser-sync','styles', 'scripts', 'watch']);