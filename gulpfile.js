const
    babel   = require('gulp-babel')
  , gulp    = require('gulp')
  , concat  = require('gulp-concat')
  , nodemon = require('gulp-nodemon');

const files = [
    'public/app.js'
  , 'public/**/*.js'
  , '!node_modules'
  , '!public/node_modules{,/**,/*.js}'
  , '!public/dist{,/**}'
]

gulp.task('vendors', () => {
  gulp.src('./public/node_modules/{**/*.js,*.js}')
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('./public/dist'))
})

gulp.task('es2015', () => {
  gulp.src(files)
  .pipe(babel({
    'presets': ['es2015']
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./public/dist'))
})



gulp.task('start', () => {
  nodemon({
    script: 'index.js',
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  })
})

gulp.watch(files, ['es2015'])

gulp.task('default', ['es2015', 'vendors', 'start'])
