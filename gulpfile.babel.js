import gulp from 'gulp';
import yargs from 'yargs';
import del from 'del';
import runSequence from 'run-sequence';
import childProcess from 'child_process';
import eslint from 'gulp-eslint';
import tslint from 'gulp-tslint';
import stylelint from 'gulp-stylelint';

const exec = childProcess.exec;
const spawn = childProcess.spawn;
const isProduction = yargs.argv.env === 'production';

// Run eslint
gulp.task('eslint', () =>
  gulp.src(['**/*.js', '**/*.jsx', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format('codeFrame'))
    .pipe(eslint.failAfterError()),
);

// Run tslint
gulp.task('tslint', () =>
  gulp.src(['**/*.ts', '**/*.tsx', '!node_modules/**'])
    .pipe(tslint({
      formatter: 'codeFrame',
    }))
    .pipe(tslint.report()),
);

// Run stylelint
gulp.task('stylelint', () =>
  gulp.src(['**/*.scss', '**/*.css', '!node_modules/**', '!**/materialize/**'])
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true },
      ],
    })),
);

// Clean webpack generated files
gulp.task('webpack:clean', () => del(['frontend/dist', 'webpack-stats.*.json']));

// Build dll reference files
gulp.task('webpack:build-dll', ['webpack:clean'], (callback) => {
  exec('npm run build-dll', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

// Generate webpack asset bundles for development
gulp.task('webpack:build-dev', (callback) => {
  const buildDev = spawn('npm', ['run', 'build-dev']);
  buildDev.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  buildDev.stderr.on('data', (data) => {
    console.log(`${data}`);
  });
  buildDev.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  buildDev.on('error', (err) => {
    callback(err);
  });
});

// Generate webpack asset bundles for production
gulp.task('webpack:build-prod', (callback) => {
  exec('npm run build-prod', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

// Generate webpack asset bundles
gulp.task('webpack:build', ['webpack:build-dll'], (callback) => {
  if (isProduction) {
    runSequence('webpack:build-prod', callback);
  } else {
    runSequence('webpack:build-dev', callback);
  }
});

// Default task
// 1. eslint
// 2. tslint
// 3. stylelint
// 4. generate webpack asset bundles
gulp.task('default', (callback) => {
  runSequence('eslint', 'tslint', 'stylelint', 'webpack:build', callback);
});
