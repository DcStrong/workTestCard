const browserSync = {
  server: ['app/dev/html', 'app/dev'],
  // ghostMode: false,
  reloadDelay: 2000,
  reloadDebounce: 1000,
  reloadThrottle: 1
};

const browserlist = [
  "last 4 versions",
  "not dead",
  "ie >= 8",
  "> 0.2%"
];

module.exports = {
  browserSync,
  browserlist
};