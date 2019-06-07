const { task, watch, parallel, series, src, dest } = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const pug = require('gulp-pug');
const sass = require("gulp-sass");
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const del = require('del'); // https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

let path = {
  src: (() => { // исходники
    let root = 'src/';

    let dir = {
      js      : 'js/',
      less    : 'less/',
      sass    : 'sass/',
      pug     : 'pug/',
      img     : 'img/',
      icons   : 'icons/',
      fonts   : 'fonts/'
    };

    let file = {
      js      : '**/*.js',
      less    : '**/*.less',
      scss    : '**/*.scss',
      sass    : '**/*.sass',
      pug     : '**/*.pug',
      img     : '**/*.*',
      icons   : '**/*.*',
      fonts   : '**/*.*'
    };

    return {
      root    : root,
      js      : { dir: `${root}${dir.js}`,    file: `${root}${dir.js}${file.js}`         },
      less    : { dir: `${root}${dir.less}`,  file: `${root}${dir.less}${file.less}`     },
      scss    : { dir: `${root}${dir.sass}`,  file: `${root}${dir.sass}${file.scss}`     },
      sass    : { dir: `${root}${dir.sass}`,  file: `${root}${dir.sass}${file.sass}`     },
      pug     : { dir: `${root}${dir.pug}`,   file: `${root}${dir.pug}${file.pug}`       },
      img     : { dir: `${root}${dir.img}`,   file: `${root}${dir.img}${file.img}`       },
      icons   : { dir: `${root}${dir.icons}`, file: `${root}${dir.icons}${file.icons}`   },
      fonts   : { dir: `${root}${dir.fonts}`, file: `${root}${dir.fonts}${file.fonts}`   }
    };
  })(),

  dev: (() => { // разработка
      let root = './dev/';

      let dir = {
        css     : 'css/',
        js      : 'js/',
        html    : 'html/',
        assets  : 'assets/',
        img     : 'assets/img/',
        icons   : 'assets/icons/',
        fonts   : 'assets/fonts/'
      };

      let file = {
        css     : '**/*.css',
        js      : '**/*.js',
        html    : '**/*.html',
        assets  : '**/*.*'
      };

      return {
        root    : root,
        js      : { dir: `${root}${dir.js}`,     file: `${root}${dir.js}${file.js}`         },
        css     : { dir: `${root}${dir.css}`,    file: `${root}${dir.css}${file.css}`       },
        html    : { dir: `${root}${dir.html}`,   file: `${root}${dir.html}${file.html}`     },
        assets  : { dir: `${root}${dir.assets}`, file: `${root}${dir.assets}${file.assets}` },
        img     : { dir: `${root}${dir.img}`,    file: `${root}${dir.img}${file.assets}`    },
        icons   : { dir: `${root}${dir.icons}`,  file: `${root}${dir.icons}${file.assets}`  },
        fonts   : { dir: `${root}${dir.fonts}`,  file: `${root}${dir.fonts}${file.assets}`  }
      };
  })(),

  dist: (() => { // релиз
    let root = './dist/';

    let dir = {
      css     : 'css/',
      js      : 'js/',
      html    : 'html/',
      assets  : 'assets/'
    };

    let file = {
      css     : '**/*.css',
      js      : '**/*.js',
      html    : '**/*.html',
      assets  : '**/*.*'
    };

    return {
      root    : root,
      js      : { dir: `${root}${dir.js}`,     file: `${root}${dir.js}${file.js}`         },
      css     : { dir: `${root}${dir.css}`,    file: `${root}${dir.css}${file.css}`       },
      html    : { dir: `${root}${dir.html}`,   file: `${root}${dir.html}${file.html}`     },
      assets  : { dir: `${root}${dir.assets}`, file: `${root}${dir.assets}${file.assets}` },
    };
  })(),

  ext: (() => { // внешние зависимости
    return {
      bootstrap: {
        sass: {
          file: 'node_modules/bootstrap/dist/css/bootstrap.min.css'
        },
        js: {
          file: 'node_modules/bootstrap/dist/js/bootstrap.min.js'
        }
      },
      jquery: {
        js: {
          file: 'node_modules/jquery/dist/jquery.min.js'
        }
      }
    };
  })()
};

let tasks = {
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
  pug     : 'pug',
  babel   : 'babel',

  dist    : 'distribution',

  refresh : 'refresh',

  default : 'run'
};

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

task(tasks.init, done => {
  src(path.ext.bootstrap.sass.file).pipe(dest(path.dev.css.dir));
  src(path.ext.bootstrap.js.file).pipe(dest(path.dev.js.dir));
  src(path.ext.jquery.js.file).pipe(dest(path.dev.js.dir));

  src(path.ext.bootstrap.sass.file).pipe(dest(path.dist.css.dir));
  src(path.ext.bootstrap.js.file).pipe(dest(path.dist.js.dir));
  src(path.ext.jquery.js.file).pipe(dest(path.dist.js.dir));
  done();
});

task(tasks.watch, done => {
  watch(path.src.less.file, series(tasks.less));
  watch(path.src.sass.file, series(tasks.sass));
  watch(path.src.pug.file, series(tasks.pug));
  watch(path.src.js.file, series(tasks.babel));
  watch(path.src.fonts.file, series(tasks.fonts));
  watch(path.src.icons.file, series(tasks.icons));
  watch(path.src.img.file, series(tasks.img));

  let watcher = done => { browserSync.reload(); done(); };
  watch(path.dev.assets.file, watcher);
  watch(path.dev.html.file, watcher);
  watch(path.dev.css.file, watcher);
  watch(path.dev.js.file, watcher);

  done();
});

task(tasks.live, done => {
  browserSync.init({
    server: {
      baseDir: path.dev.root
    },
    ghostMode: false,
    reloadDelay: 1000,
    reloadDebounce: 1000,
    reloadThrottle: 1
  });
  done();
});

task(tasks.assets, done => {
  src(path.src.fonts.file).pipe(dest(path.dev.fonts.dir));
  src(path.src.icons.file).pipe(dest(path.dev.icons.dir));
  src(path.src.img.file).pipe(dest(path.dev.img.dir));
  done();
});

task(tasks.fonts, done => {
  src(path.src.fonts.file).pipe(dest(path.dev.fonts.dir));
  done();
});

task(tasks.icons, done => {
  src(path.src.icons.file).pipe(dest(path.dev.icons.dir));
  done();
});

task(tasks.img, done => {
  src(path.src.img.file).pipe(dest(path.dev.img.dir));
  done();
});

task(tasks.less, done => {
  src(path.src.less.file).pipe(less()).pipe(dest(path.dev.css.dir));
  done();
});

task(tasks.sass, done => {
  src(path.src.sass.file).pipe(sass()).pipe(dest(path.dev.css.dir));
  src(path.src.scss.file).pipe(sass()).pipe(dest(path.dev.css.dir));
  done();
});

task(tasks.pug, done => {
  src(path.src.pug.file).pipe(pug()).pipe(dest(path.dev.html.dir));
  done();
});

task(tasks.babel, done => {
  src(path.src.js.file).pipe(babel({ presets: ['@babel/env'] })).pipe(dest(path.dev.js.dir));
  done();
});

task(tasks.dist, done => {
  src([`!${path.dev.css.dir}/bootstrap.css`, path.dev.css.file]).pipe(concat('style.css')).pipe(dest(path.dist.css.dir));
  src([`!${path.dev.js.dir}/bootstrap.min.js`, `!${path.dev.js.dir}/jquery.min.js`, path.dev.js.file]).pipe(concat('script.js')).pipe(dest(path.dist.js.dir));

  src(path.dev.assets.file).pipe(dest(path.dist.assets.dir));
  done();
});

task(tasks.refresh, series(
  tasks.clean,
  tasks.init,
  tasks.assets,
  tasks.less,
  tasks.sass,
  tasks.pug,
  tasks.babel,
  done => { done(); }
));

task(tasks.default, series(
  tasks.watch,
  tasks.live,
  done => { done(); }
));