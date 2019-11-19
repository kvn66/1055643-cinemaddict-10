'use strict';

const gulp = require(`gulp`);
const server = require(`browser-sync`).create();

gulp.task(`refresh`, function (done) {
  server.reload();
  done();
});

gulp.task(`server`, function () {
  server.init({
    server: ``,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`public/*.html`, gulp.series(`refresh`));
  gulp.watch(`src/**/*.js`, gulp.series(`refresh`));
});

gulp.task(`start`, gulp.series(`server`));
