import gulp from 'gulp';
import yargs from 'yargs';
import command from 'gulp-run';
import del from 'del';


const isProduction = yargs.argv.env === 'production';
const paths = {
    css: './frontend/src/css/*',
    js: './frontend/src/js/*',
};

gulp.task('webpack:clean', () => del(['frontend/dist']));

gulp.task('webpack:dll', ['webpack:clean'], () => command('npm run build-dll').exec());

gulp.task('webpack:build-dev', () => command('npm run build-dev').exec());

gulp.task('webpack:build-prod', () => command('npm run build-prod').exec());

gulp.task('webpack:build', ['webpack:dll'], () => {
    if (isProduction) {
        command('npm run build-prod').exec();
    } else {
        command('npm run build-dev').exec();
        gulp.watch([paths.css, paths.js], ['webpack:build-dev']);
    }
});

gulp.task('default', ['webpack:build']);
