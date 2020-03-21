/**
 * sources
 */
let src = (() => {
  let root = 'app/src/';

  let dir = {
    js      : 'js/',
    less    : 'less/',
    sass    : 'sass/',
    stylus  : 'stylus/',
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
    stylus  : '**/*.styl',
    pug     : '**/*.pug',
    img     : '**/*.*',
    icons   : '**/*.*',
    fonts   : '**/*.*'
  };

  return {
    root    : root,
    js      : { dir: `${root}${dir.js}`,     file: `${root}${dir.js}${file.js}`         },
    less    : { dir: `${root}${dir.less}`,   file: `${root}${dir.less}${file.less}`     },
    scss    : { dir: `${root}${dir.sass}`,   file: `${root}${dir.sass}${file.scss}`     },
    sass    : { dir: `${root}${dir.sass}`,   file: `${root}${dir.sass}${file.sass}`     },
    stylus  : { dir: `${root}${dir.stylus}`, file: `${root}${dir.stylus}${file.stylus}` },
    pug     : { dir: `${root}${dir.pug}`,    file: `${root}${dir.pug}${file.pug}`       },
    img     : { dir: `${root}${dir.img}`,    file: `${root}${dir.img}${file.img}`       },
    icons   : { dir: `${root}${dir.icons}`,  file: `${root}${dir.icons}${file.icons}`   },
    fonts   : { dir: `${root}${dir.fonts}`,  file: `${root}${dir.fonts}${file.fonts}`   }
  };
})();
/**
 * development
 */
let dev = (() => {
  let root = 'app/dev/';

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
})();
/**
 * distribution
 */
let dist = (() => {
  let root = 'app/dist/';

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
})();
/**
 * external resources
 */
let ext = (() => {
  return {
    jquery: {
      js: {
        file: 'node_modules/jquery/dist/jquery.min.js'
      }
    },
    autocomplite: {
      js: {
        file: 'node_modules/jquery-autocomplete/jquery.autocomplete.js'
      },
      css: {
        file: 'node_modules/jquery-autocomplete/jquery.autocomplete.css'
      }
    }
  };
})();

module.exports = {
  src,
  dev,
  dist,
  ext
};