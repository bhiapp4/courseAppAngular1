var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        port: 18080,
        server: {
            baseDir: ["app"],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    })

    gulp.watch(['app/**/*.*']).on('change', browserSync.reload);
});

gulp.task('installFonts', function () {
    var bowerFiles = require('main-bower-files');

    return gulp.src(bowerFiles('**/fonts/*'))
        .pipe(gulp.dest('./app/assets/fonts'));

});

gulp.task('default', ['installFonts'], function () {

    var bowerFiles = require('main-bower-files'),
        inject = require('gulp-inject'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        cleanCss = require('gulp-clean-css'),
        argv = require('yargs').argv,
        rename = require('gulp-rename'),
        gulpif = require('gulp-if');

    var buildDirectory = './app/assets/build';
    var vendorDirectory = './app/assets/vendors';

    var bowerStreamJS = gulp.src(bowerFiles('**/*.js'));
    var bowerStreamCSS = gulp.src(bowerFiles('**/*.css'));
    var appStreamJS = gulp.src(['./app/src/**/*.js']);
    var appStreamCSS = gulp.src(['./app/src/app.css']);

    // run this action if gulp is run with --production argument
    if (argv.production) {
        // Concatenate and minify bower scripts
        bowerStreamJS = bowerStreamJS
            .pipe(concat('vendors.js'))
            .pipe(uglify())
            .pipe(gulp.dest(buildDirectory));

        // Concatenate and minify bower css
        bowerStreamCSS = bowerStreamCSS
            .pipe(concat('vendors.css'))
            .pipe(cleanCss())
            .pipe(gulp.dest(buildDirectory));

        // Concatenate and minify app scripts
        appStreamJS = appStreamJS
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest(buildDirectory));

        // Concatenate and minify app css
        appStreamCSS = appStreamCSS
            .pipe(concat('app.css'))
            .pipe(cleanCss())
            .pipe(gulp.dest(buildDirectory));
    }
    // default gulp action
    else {
        bowerStreamJS = bowerStreamJS
            .pipe(gulp.dest(vendorDirectory));
        bowerStreamCSS = bowerStreamCSS
            .pipe(gulp.dest(vendorDirectory));
    }

    // choose source index.html to inject
    gulp.src('./app/index.html')
        // send bower scripts
        .pipe(
            inject(bowerStreamJS, {
                relative: true,
                name: 'bower'
            })
        )
        // send bower bower css
        .pipe(
            inject(bowerStreamCSS, {
                relative: true,
                name: 'bower'
            })
        )
        // send app scripts
        .pipe(
            inject(appStreamJS, {
                relative: true
            })
        )
        // send app css
        .pipe(
            inject(appStreamCSS, {
                relative: true
            })
        )
        // create index.prod.html if run with --production argument
        .pipe(
            gulpif(argv.production, rename('index.prod.html'))
        )
        // save the file
        .pipe(
            gulp.dest('app')
        );

});
