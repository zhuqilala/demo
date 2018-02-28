var gulp = require("gulp"); // 加载本地组件，并实例化 gulp
// gulp methods
// .task() 事务
// .src() 源文件
// .dest() 目标文件
// .pipe() 流程，处理
// .watch() 监视，监控

var browserSync = require("browser-sync").create();
// 加入浏览器同步组件 browser-sync，再用 create() 实例化

var sass = require("gulp-sass"); // 实例化
var rename = require("gulp-rename");

// 创建浏览器服务器并配置、初始化的事务
gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./www/"
        }
    });
});
// 自动刷新浏览器
gulp.task("reload", function () {
    browserSync.reload();
});

// 创建 copy 事务: 把所有 bower 下载的插件复制到 www 下
gulp.task("copy", function () {
    var path = "./bower_components";
    // copy jquery
    var f = path + "/jquery/dist/jquery.";
    gulp.src([f + "js", f + "min.js"])
        .pipe(gulp.dest("./www/js/"));
    // copy vue
    var v = path + "/vue/dist/vue.";
    gulp.src([v + "js", v + "min.js"])
        .pipe(gulp.dest("./www/js/"));
    // copy bootstrap
    var g = [
        path + "/bootstrap/dist/**/*.css",
        path + "/bootstrap/dist/**/glyphicons-halflings-regular.*",
        path + "/bootstrap/dist/**/*.js",
        "!" + path + "/bootstrap/dist/**/npm*.js"
    ];
    gulp.src(g)
        .pipe(gulp.dest("./www/"));
    gulp.src("./src/favicon.ico")
        .pipe(gulp.dest("./www/"));
});

// 拷贝超文本文件 *.html 到输出文件夹 www
gulp.task("html", function () {
    gulp
        .src([
            "./src/**/*.html",
            "!./src/**/_*.html",
            "!./src/**/*!.html"
        ])
        .pipe(gulp.dest("./www/"));
});

// 创建 SASS 的编（转）译、输出到 www/css 下
gulp.task("sass", function () {
    gulp
        .src("./src/sass/**/*.scss")
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(sass({ outputStyle: "expanded" }))
        // .pipe(sass({ outputStyle: "compressed" }))
        // .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./www/css/"));
    // outputStyle: compressed
});

// 拷贝 css 到输出文件夹 www
gulp.task("css", function () {
    gulp
        .src([
            "./src/css/**/*.css",
            "!./src/css/**/_*.css"
        ])
        .pipe(gulp.dest("./www/css/"));
});

// 拷贝 js 到输出文件夹 www
gulp.task("js", function () {
    gulp
        .src([
            "./src/js/**/*.js",
            "!./src/js/**/_*.js"
        ])
        .pipe(gulp.dest("./www/js/"));
});

// 拷贝 js 到输出文件夹 www
gulp.task("img", function () {
    gulp
        .src([
            "./src/img/**/*.png",
            "./src/img/**/*.jpg",
            "./src/img/**/*.gif",
            "!./src/img/**/_*.png",
            "!./src/img/**/_*.jpg",
            "!./src/img/**/_*.gif"
        ])
        .pipe(gulp.dest("./www/img/"));
});

// 创建事务 hello
gulp.task("hello", function () {
    console.log("Hello world!");
});

// 创建项目监视器，监视所有文件的状态
gulp.task("watch", function () {
    gulp.watch("./src/sass/**/*.scss", ["sass"]);
    gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./src/css/**/*.css", ["css"]);
    gulp.watch("./src/js/**/*.js", ["js"]);
    gulp.watch([
        "./src/img/**/*.jpg",
        "./src/img/**/*.png",
        "./src/img/**/*.gif"
    ], ["img"]);
    gulp.watch(["./www/*.html", "./www/css/*.css"], ["reload"]);
});

// 默认事务 default
gulp.task("default", [
    "copy",
    "html", "sass", "css", "js", "img",
    "serve", "watch"
]);