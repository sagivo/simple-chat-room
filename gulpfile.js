var gulp = require('gulp');
var supervisor = require("gulp-supervisor");

gulp.task('default', () => {
    supervisor('index.js', {
        exec: 'node',
        watch: ['index.js', 'classes'],
    });
});
