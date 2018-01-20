
const gulp = require("gulp");
const plumber = require("gulp-plumber"); // less 文件编译报错不会中断 watch
const less = require("gulp-less"); // less 文件
/**
 * less文件转css
 */
gulp.task("less", function() {
  const list = [`../public/src/less/index.less`];
  return (gulp
      .src(list)
      // plumber 插件可以 catch less 的错误，让 watch 不会中断
      .pipe(
        plumber({
          errorHandler: function(err) {
            console.error(err.message);
            console.error(err.extract.join("\r\n"));
            this.emit("end");
          }
        })
      )
      .pipe(less())
      .pipe(gulp.dest(`../public/build/css/`)) );
});

gulp.task("default", function() {
  gulp.run("less", function() {
    console.info("*** done ***");
  });
});
