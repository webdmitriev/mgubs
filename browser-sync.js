const browserSync = require('browser-sync').create();

browserSync.init({
  proxy: "http://localhost:8888/github", // ← локальный WP
  files: [
    "assets/css-js/*.css",
    "assets/css-js/*.js",
    "build/**/*.js",
    "**/*.php"
  ],
  notify: false,
  open: "external",
  reloadDelay: 300
});
