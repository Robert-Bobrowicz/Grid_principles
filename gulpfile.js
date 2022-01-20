const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function buildStyles() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())  // pokazuje w Zbadaj konkretne miesjce linię w kodzie w określonym pliku np. main.sccs : 3
        .pipe(sass({
            //outputStyle: 'compressed' // domyślnie jest expanded
        }).on('error', sass.logError))
        .pipe(autoprefixer({  //dodajemy po stylowaniu css
            cascade: false
        }))
        .pipe(sourcemaps.write('.')) //. dodaje nowy plik w css z mapą
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watcher(done) { //bo nie działa na plikach
    gulp.watch('./scss/**/*.scss', gulp.series(buildStyles)); // w katalogu scss odpal zadania :)
    gulp.watch("./*.html").on('change', browserSync.reload); //synchronizacja przeglądarki
    done();
}

function server(done) { //automatyzacja zmian widocznych w przeglądarce automatycznie bez uruchamiania na nowo gulpa
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

module.exports.buildStyles = buildStyles;
module.exports.default = gulp.series(server, buildStyles, watcher); //gulp.series lub gulp.parallel()