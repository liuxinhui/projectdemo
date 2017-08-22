var gulp = require('gulp'), //导入gulp
    glp_del = require('del'),
    //css处理
    glp_less = require('gulp-less'),
    glp_sass = require('gulp-sass'),
    glp_minicss = require('gulp-clean-css'),
    //js处理
    glp_concat = require('gulp-concat'),
    glp_jshint = require('gulp-jshint'),
    glp_uglify = require('gulp-uglify'),
    //图片压缩
    glp_imagemin = require('gulp-imagemin'),
    //服务器
    glp_server = require('gulp-server-livereload'),
    //常用依赖库
    glp_plumber = require('gulp-plumber'),
    glp_rename = require('gulp-rename'),
    //	sourcemaps = require('gulp-sourcemaps'),
    paths = {
        root: './',
        dist: {
            root: 'dist',
            styles: 'dist/style',
            img: 'dist/img',
            scripts: 'dist/script',
            fonts: 'dist/fonts',
            html: 'dist/html'
        },
        source: {
            root: 'src',
            less: 'src/less',
            sass: 'src/sass',
            img: 'src/image',
            scripts: 'src/script',
            fonts: 'src/fonts',
            html: 'src/html'
        }
    };
//清除文件
gulp.task('clean', function(cb) {
    return glp_del([paths.dist.root], cb);
});
//样式生成
gulp.task('less', function(cb) {
    return gulp.src(paths.source.less + '/**/index_less.less')
        .pipe(glp_less())
        .pipe(glp_plumber())
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(glp_minicss())
        .pipe(glp_rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.styles))
});
gulp.task('sass', function(cb) {
    return gulp.src(paths.source.sass + '/**/index_sass.scss')
        .pipe(glp_sass())
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(glp_minicss())
        .pipe(glp_plumber())
        .pipe(glp_rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.styles))
});
//js生成
gulp.task('js', function(cb) {
    return gulp.src(paths.source.scripts + '/**/*.js')
        .pipe(glp_jshint())
        .pipe(glp_concat("all.js"))
        .pipe(glp_plumber())
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(glp_uglify())
        .pipe(glp_rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.scripts))
});

//img生成
gulp.task('img', function(cb) {
    return gulp.src(paths.source.img + '/**/*')
        .pipe(glp_imagemin())
        .pipe(gulp.dest(paths.dist.img))
});
//font生成
gulp.task('fonts', function(cb) {
    return gulp.src(paths.source.fonts + '/**/*')
        .pipe(gulp.dest(paths.dist.fonts))
});
//html生成
gulp.task('html', function(cb) {
    return gulp.src(paths.source.html + '/**/*.html')
        .pipe(gulp.dest(paths.dist.html))
});
//合并生成任务
gulp.task('build', ['clean'], function(cb) {
    gulp.run('less','img', 'js', 'fonts', 'html')
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(glp_server({
            livereload: true,
            port: '3003',
            host: 'localhost',
            directoryListing: false,
            defaultFile: "index.html",
            open: true
        }));
});
gulp.task('watch', function(cb) {
    gulp.watch(paths.source.less + '/**/*.less', ['less']);
    // gulp.watch(paths.source.sass + '/**/*.scss', ['sass']);
    gulp.watch(paths.source.scripts + '/**/*.js', ['js']);
    gulp.watch(paths.source.html + '/**/*.html', ['html']);
});
//默认命令
gulp.task('default', ['build', 'webserver', 'watch']);
