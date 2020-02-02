organizze-gulp-sass-bulk-import
===============================

Modified ```gulp-sass-bulk-import``` original code in 2 aspects.

1 - Bulk @import paths will be transated to a relative path.

2 - Added support for general ```@import '*'``` rule that will fetch all files from the same dir ignoring only the calling file.

## installation

```
npm install --save-dev organizze-gulp-sass-bulk-import
```


## usage


#### in your .scss file

```scss

@import "some/path/*";

// becomes
// @import "some/path/file1.scss";
// @import "some/path/file2.scss";
// ...

```

#### in your gulpfile

```js
var bulkSass = require('organizze-gulp-sass-bulk-import');

gulp.task('css', function() {
    return gulp
            .src(srcDir + 'stylesheets/app.scss')
            .pipe(bulkSass())
            .pipe(
                sass({
                    includePaths: ['src/stylesheets']
                }))
            .pipe( gulp.dest('./public/css/') );
});
```

