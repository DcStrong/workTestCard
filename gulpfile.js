/**
 * gulp functions
 */
const { task, watch, parallel, series, src, dest } = require('gulp');
/**
 * gulp plugins
 */
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const less = require('gulp-less');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const stylus = require('gulp-stylus');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
/**
 * postcss plugins
 */
const doiuse = require('doiuse');
const flexbugs = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
/**
 * miscellaneous plugins
 */
const del = require('del');
require('node-env-file')('./.env', { verbose: true, overwrite: true, raise: false, logger: console });
require('colors');
/**
 * local server
 */
const browserSync = require('browser-sync').create();
/**
 * local imports
 */
const path = require('./server/routes');
const config = require('./server/config');
config['postcss'] = [
  flexbugs(),
  autoprefixer({ cascade: false }),
  doiuse({
    ignore: ['rem'],
    ignoreFiles: ['**/bootstrap.min.css'],
    onFeatureUsage: function (i) {
      let fileName = i.usage.source.input.file.match(/[\w-]+?(?=\.)/)[0];
      let fileLine = i.usage.source.start.line;
      let cssProp = i.feature;
      let cssSup = {
        missing: i.featureData.missing,
        partial: i.featureData.partial
      };

      let prefix = '[' + 'Can I Use'.blue + ']';
      let source = `~\\${fileName}:${fileLine}`.green;
      let prop = `${cssProp}`.magenta;
      let ms = `${cssSup.missing}`.red;
      let ps = `${cssSup.partial}`.yellow;

      console.log('\r\n', prefix, source, prop,'\r\n    ',  ms,'\r\n    ', ps);
    }
  })
];
config['plumber'] = {
  errorHandler() {
    process.env.NODE_ENV === 'production' && plumber.stop();
  }
};
/**
 * gulp tasks list
 */
const tasks = {
  clean   : 'clean',
  init    : 'init',
  watch   : 'watch',
  live    : 'live',

  assets  : 'assets',
  fonts   : 'fonts',
  icons   : 'icons',
  img     : 'img',
  less    : 'less',
  sass    : 'sass',
  stylus  : 'stylus',
  pug     : 'pug',
  babel   : 'babel',

  dist    : 'distribution',

  refresh : 'refresh',

  default : 'run'
};
/**
 *
 */
task(tasks.clean, done => {
  let dels = [
    del(`${path.dev.css.dir}**/*.*`),
    del(`${path.dev.assets.dir}**/*.*`),
    del(`${path.dev.html.dir}**/*.*`),
    del(`${path.dev.js.dir}**/*.*`),

    del(`${path.dist.css.dir}**/*.*`),
    del(`${path.dist.html.dir}**/*.*`),
    del(`${path.dist.assets.dir}**/*.*`),
    del(`${path.dist.js.dir}**/*.*`),
  ];

  return Promise.all(dels).then(() => { done(); }, e => { console.log(e); done(); });
});
/**
 *
 */
task(tasks.init, done => {
  src(path.ext.bootstrap.css.file).pipe(dest(path.dev.css.dir));
  src(path.ext.jquery.js.file).pipe(dest(path.dev.js.dir));
  src(path.ext.simpleslider.js.file).pipe(dest(path.dev.js.dir));

  src(path.ext.bootstrap.css.file).pipe(dest(path.dist.css.dir));
  src(path.ext.jquery.js.file).pipe(dest(path.dist.js.dir));
  src(path.ext.simpleslider.js.file).pipe(dest(path.dist.js.dir));

  done();
});
/**
 *
 */
task(tasks.watch, done => {
  /**
   *
   */
  watch(path.src.less.file, series(tasks.less));
  watch(path.src.sass.file, series(tasks.sass));
  watch(path.src.stylus.file, series(tasks.stylus));
  watch(path.src.pug.file, series(tasks.pug));
  watch(path.src.js.file, series(tasks.babel));
  watch(path.src.fonts.file, series(tasks.fonts));
  watch(path.src.icons.file, series(tasks.icons));
  watch(path.src.img.file, series(tasks.img));
  /**
   *
   */
  let devWatcher = done => { browserSync.reload(); done(); };
  watch(path.dev.assets.file, devWatcher);
  watch(path.dev.html.file, devWatcher);
  watch(path.dev.css.file, devWatcher);
  watch(path.dev.js.file, devWatcher);

  done();
});
/**
 *
 */
task(tasks.live, done => {
  browserSync.init(config.browserSync);
  done();
});
/**
 *
 */
task(tasks.assets, done => {
  src(path.src.fonts.file).pipe(dest(path.dev.fonts.dir));
  src(path.src.icons.file).pipe(dest(path.dev.icons.dir));
  src(path.src.img.file).pipe(dest(path.dev.img.dir));
  done();
});
/**
 *
 */
task(tasks.fonts, done => {
  src(path.src.fonts.file).pipe(dest(path.dev.fonts.dir));
  done();
});
/**
 *
 */
task(tasks.icons, done => {
  src(path.src.icons.file).pipe(dest(path.dev.icons.dir));
  done();
});
/**
 *
 */
task(tasks.img, done => {
  src(path.src.img.file).pipe(dest(path.dev.img.dir));
  done();
});
/**
 *
 */
task(tasks.less, done => {
  src(path.src.less.file).pipe(plumber()).pipe(less()).pipe(postcss(config.postcss)).pipe(dest(path.dev.css.dir));
  done();
});
/**
 *
 */
task(tasks.sass, done => {
  src(path.src.sass.file).pipe(plumber()).pipe(sass()).pipe(postcss(config.postcss)).pipe(dest(path.dev.css.dir));
  src(path.src.scss.file).pipe(plumber()).pipe(sass()).pipe(postcss(config.postcss)).pipe(dest(path.dev.css.dir));
  done();
});
/**
 *
 */
task(tasks.stylus, done => {
  src(path.src.stylus.file).pipe(plumber()).pipe(stylus()).pipe(postcss(config.postcss)).pipe(dest(path.dev.css.dir));
  done();
});
/**
 *
 */
task(tasks.pug, done => {
  src(path.src.pug.file).pipe(plumber()).pipe(pug()).pipe(dest(path.dev.html.dir));
  done();
});
/**
 *
 */
task(tasks.babel, done => {
  src(path.src.js.file).pipe(plumber()).pipe(babel({ presets: ['@babel/env'] })).pipe(dest(path.dev.js.dir));
  done();
});
/**
 *
 */
task(tasks.dist, done => {
  src([`!${path.dev.css.dir}/bootstrap.css`, path.dev.css.file]).pipe(concat('style.css')).pipe(dest(path.dist.css.dir));
  src([`!${path.dev.js.dir}/bootstrap.min.js`, `!${path.dev.js.dir}/jquery.min.js`, path.dev.js.file]).pipe(concat('script.js')).pipe(dest(path.dist.js.dir));

  src(path.dev.assets.file).pipe(dest(path.dist.assets.dir));
  done();
});
/**
 *
 */
task(tasks.refresh, series(
  tasks.clean,
  tasks.init,
  tasks.assets,
  tasks.less,
  tasks.sass,
  tasks.stylus,
  // tasks.postcss,
  tasks.pug,
  tasks.babel,
  done => { done(); }
));
/**
 *
 */
task(tasks.default, series(
  tasks.watch,
  tasks.live,
  done => { done(); }
));
