var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var parser = require('json-parser');
var replace = require('gulp-replace');
var minify = require('gulp-minify');
var distFolder = "dist";
var buildFolder = './' + distFolder + "/build";
var cloudFolder = "icloud";
var moduleName = "starter";
var entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
var chunkFile = {}, bundleFile = {};

gulp.task('clean', function(cb) {
  return del([
    buildFolder,
    distFolder
  ], cb);
});

// Copy all resources
gulp.task('copyFont', function () {
  return gulp.src(distFolder + '/fonts/*')
    .pipe(gulp.dest(buildFolder+ '/font'));
});
gulp.task('copyAssets', function () {
  return gulp.src(distFolder + '/assets/images/**')
    .pipe(gulp.dest(buildFolder+ '/images'));
});

gulp.task('copyJs', function () {
  return gulp.src(distFolder + '/*.js')
    .pipe(minify({
      ext:{
        src:'-debug.js',
        min:'.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest(buildFolder+ '/js'));
});

gulp.task('copyResources', function () {
  return gulp.src(cloudFolder + '/**')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('replaceHTML', function () {
  var pageFolder= '/page';
  var pageSource = gulp.src(cloudFolder + pageFolder +  '/index.html');
  for (var f in bundleFile) {
    pageSource.pipe(replace('{'+ f + '}', bundleFile[f].split('/').pop())).pipe(gulp.dest(buildFolder + pageFolder));
  }
  return pageSource.pipe(gulp.dest(buildFolder + pageFolder));
});

gulp.task('zip',['copyFont', 'copyAssets', 'deploy', 'copyResources'], function () {
  runSequence('copyJs',['replaceHTML'], function(){
    return gulp.src([buildFolder + '/**'])
      .pipe(zip(moduleName + '.zip'))
      .pipe(gulp.dest(distFolder +'/target'))
  });
});

gulp.task('deploy', function () {
  var jsFolderStr = 'iNet.jsFolder + "';
  chunkFile= {};
  bundleFile= {};
  try {
    var files = fs.readdirSync(distFolder, 'utf8');
    var __fileName;
    for(var f in files) {
      var __file = files[f];
      if(!!__file && __file.startsWith('vendor.') && __file.split('.').pop()==='js') {
        bundleFile['vendor']=distFolder + '/'+ __file;
      }
      if(!!__file && __file.startsWith('inline.') && __file.split('.').pop()==='js') {
        //console.log('Parse file: ' + __file);
        var data = fs.readFileSync(distFolder + '/'+ __file, 'utf8');
        var text = '"." +';
        var index = data.search(text);
        if( index> -1) {
          var temp = data.substring(index + text.length, data.length).trim();
          index = temp.search("}");
          temp = temp.substring(0, index + 1);
          var packObj = parser.parse(temp);
          bundleFile['inline'] = distFolder + '/' + __file;
          for (var chunkId in packObj) {
            if (entryPoints.indexOf(chunkId) > -1) { //bundle js
              __fileName = distFolder + '/' + chunkId + "." + packObj[chunkId] + '.bundle.js';
              bundleFile[chunkId] = __fileName;
            } else {
              __fileName = distFolder + '/' + chunkId + "." + packObj[chunkId] + '.chunk.js';
              chunkFile[chunkId] = __fileName;
              gulp.src([__fileName]).pipe(replace('"' + chunkId + '"', jsFolderStr + chunkId + '"')).pipe(gulp.dest(distFolder));
            }
          }
          /*
          console.log('chunkFiles:');
          console.log(chunkFile);
          console.log('==============================================');
          console.log('bundleFiles:');
          console.log(bundleFile);
          console.log('==============================================');
          */
          var mainSource = gulp.src([bundleFile['main']]);
          for (var k in chunkFile) {
            mainSource.pipe(replace('"' + k + '"', jsFolderStr + k + '"')).pipe(gulp.dest(distFolder));
          }
          gulp.src([bundleFile['inline']]).pipe(replace('}[chunkId]', '}[chunkId.split(\'/\').pop()]')).pipe(gulp.dest(distFolder));
        } else {
          var filename = distFolder + '/main.bundle.js';
          var mainSource = gulp.src([filename]);
          var modules = [];
          try {
            var data = fs.readFileSync(filename, 'utf8');
            var text = "var map = {";
            var index = data.search(text);
            var temp = data.substring(index, data.length);
            index = temp.search(";");
            if(index > -1) {
              temp = temp.substring(text.length - 1, index);
              var obj = parser.parse(temp);
              var module;
              for (var key in obj) {
                for (var j = 1; j < (obj[key]).length; j++) {
                  module = (obj[key])[j];
                  if (!!module && modules.indexOf(module) < 0) {
                    mainSource.pipe(replace('"' + module + '"', jsFolderStr + module + '"')).pipe(gulp.dest(distFolder));
                    gulp.src([distFolder + '/' + module + '.chunk.js']).pipe(replace('"' + module + '"', jsFolderStr + module + '"')).pipe(gulp.dest(distFolder));
                    modules.push(module);
                  }
                }
              }
            }
          } catch (err) {
          } finally {
            for(var i=0; i < entryPoints.length; i++) {
              bundleFile[entryPoints[i].toString()]= distFolder + '/'+ entryPoints[i] + '.bundle.js?v=$ctx.version()';
            }
          }
        }
      }
    }
  } catch (err) {

  }
});

gulp.task('build', function (cb) {
  return exec('npm run deploy',{maxBuffer: 1024 * 1024}, function(err, stdout, stderr){
    console.log(stdout);
    if(!err){
      runSequence('zip');
    } else {
      console.log(err);
    }
  });
});

gulp.task('output', function (cb) {
  return exec('ng build prod',{maxBuffer: 1024 * 1024}, function(err, stdout, stderr){
    console.log(stdout);
    if(!err){
      runSequence('zip');
    } else {
      console.log(err);
    }
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', function() {
  runSequence('clean', 'build');
});

