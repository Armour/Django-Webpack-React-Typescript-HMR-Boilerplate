// @flow

import gulp from 'gulp';
import yargs from 'yargs';
import del from 'del';
import runSequence from 'run-sequence';
import childProcess from 'child_process';

const exec = childProcess.exec;
const spawn = childProcess.spawn;
const isProduction = yargs.argv.env === 'production';

gulp.task('webpack:clean', () => del(['frontend/dist', 'webpack-stats.*.json']));

gulp.task('webpack:build-dll', ['webpack:clean'], (callback) => {
  exec('npm run build-dll', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

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

gulp.task('webpack:build-prod', (callback) => {
  exec('npm run build-prod', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('webpack:build', ['webpack:build-dll'], (callback) => {
  if (isProduction) {
    runSequence('webpack:build-prod', callback);
  } else {
    runSequence('webpack:build-dev', callback);
  }
});

gulp.task('default', ['webpack:build']);
