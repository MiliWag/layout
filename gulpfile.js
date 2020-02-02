/**
 * To start - gulp | gulp watchDev
 * Before you start new project, change this:
 * const ApiKeyTinyPng - enter your apiKey
 * const themeName - name of project (should be same asi repository name)
 * 
 * Check vendor sripts you wanna use. Array or vendor scripts.
 * const includedScripts
 * 
 * UsefulTasks:
 * Build all one time - gulp buildDev
 * Build assets versions - gulp buildVersionsAssets
 * Copy Images to Theme - gulp themeImages
 * Copy CSS, JS and Images to Theme - gulp themeFiles
 * Build Images - gulp buildImages
 * 
 */

const ApiKeyTinyPng = "6R57G0bzGkiI4egisa3gjnd8F1HrGkjQ";

// Theme
const themeName = "rolig";
const themePath = "../../wp-content/themes/" + themeName + "/";

const {
	src,
	dest,
	parallel,
	series
} = require("gulp");


// Requires
const nunjucksRender = require("gulp-nunjucks-render");
const htmlbeautify = require("gulp-html-beautify");
const data = require("gulp-data");
const watch = require("gulp-watch");
const newer = require("gulp-newer");
const sass = require("gulp-sass");
const bulkSass = require("organizze-gulp-sass-bulk-import");
const autoprefixer = require("gulp-autoprefixer");
const postcss = require("gulp-postcss");
const emMediaQuery = require("postcss-em-media-query");
const browsersync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const pxtorem = require('postcss-pxtorem');
const svgo = require("gulp-svgo");
const tinypng = require("gulp-tinypng-compress");
const webp = require("gulp-webp");
const inject = require("gulp-inject");
const del = require("del");
const replace = require("gulp-string-replace");
const babel = require('gulp-babel');
const purgecss = require('@fullhuman/postcss-purgecss');
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require('cssnano');
const filePath = require('path');
const replaceInFile = require('replace-in-file');
const fs = require('fs-extra');




// Path
const path = {
	src: "src/",
	srcImages: "src/images/",
	srcJs: "src/js/",
	srcScss: "src/scss/",

	build: "build/",
	buildImages: "build/images/",
	buildJs: "build/js/",

	components: "src/components/",
	nodeModules: "node_modules/",
	layouts: "src/layouts/",

	temp: "temp/"
}

const includedScripts = [
	path.nodeModules + "vanilla-lazyload/dist/lazyload.min.js",
	path.nodeModules + "object-fit-images/dist/ofi.min.js",
	path.nodeModules + "headroom.js/dist/headroom.min.js",
	path.nodeModules + "mobius1-selectr/dist/selectr.min.js",
	path.temp + "functions.js"
];


// Purge
const purgeSettings = {
	content: [path.build + "js/*.js", path.build + "*.html"],
	input: [path.build + "style.css"],
	whitelist: ["col-sm-6", "col-6", "h-100", "h-auto", "row", "justify-content-center", "justify-content-between", "mb-1", "mb-2", "mb-3", "col-md-6", "col-md-3", "col-md-4", "text-center"]
}

// Globs
const globImagesSrc = {
	svg: path.srcImages + "**/*.svg",
	raster: [path.srcImages + "**/*.{png,jpg,jpeg}", "!" + path.srcImages + "content/**/*"],
	webp: [path.srcImages + "**/*.{png,jpg,jpeg}", "!" + path.srcImages + "content/**/*", "!" + path.srcImages + "favicon/**/*"],
	content: path.srcImages + "content/**/*.{png,jpg,jpeg}"
}


const scriptsGlob = [
	path.srcJs + "*.js",
	path.components + "**/*.js"
]


//VersionsStuff
const versionsAssetsFileName = "VersionsAssets.php";


function getStamp() {
	var myDate = new Date();
	var myYear = myDate.getFullYear().toString();
	var myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
	var myDay = ("0" + myDate.getDate()).slice(-2);
	var mySeconds = myDate.getSeconds().toString();
	var myRandom = Math.floor(Math.random() * 100);
	var myFullDate = myYear + myMonth + myDay + mySeconds + myRandom;
	return myFullDate;
}


// --- Tasks --------------

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: path.build
		}
	});
	done();
}

// Html
function nunjucks() {

	return src(path.layouts + "**/*.+(nunjucks|njk)")

		// Load data from json file
		.pipe(data(function () {
			return JSON.parse(fs.readFileSync(path.src + "data.json"))
		}))

		// Renders template with nunjucks
		.pipe(nunjucksRender({
			path: [path.components, path.buildImages]
		}))

		// output files in build folder
		.pipe(dest(path.build))
}
exports.nunjucks = nunjucks;

function htmlBeauty() {
	var options = {
		max_preserve_newlines: 1,
		indentSize: 2,
		indent_with_tabs: true,
	};
	return src(path.build + "*.html")
		.pipe(htmlbeautify(options))
		.pipe(dest(path.build))
		.pipe(browsersync.stream());
}
exports.htmlBeauty = htmlBeauty;


// Scripts
function scripts() {
	return src(includedScripts)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(concat("functions.min.js"))
		.pipe(uglify())
		.pipe(sourcemaps.init())
		.pipe(dest(path.buildJs))
		.pipe(dest(themePath))
		.pipe(browsersync.stream());
}
exports.scripts = scripts;

function scriptsProd() {

	createVersionsFile();
	cleanFolderWithNFolders(themePath + "assets/js", 5);

	var StampCurrent = getStamp();

	var dir = themePath + 'panda/';
	var file = dir + versionsAssetsFileName;

	if (fs.existsSync(file)) {
		const options = {
			files: file,
			from: /ASSETS_JS_VERSION","([0-9]*)/g,
			to: 'ASSETS_JS_VERSION","' + StampCurrent
		};
		replaceInFile(options);
	}

	return src(themePath + "functions.min.js")
		.pipe(dest(themePath + "assets/js/" + StampCurrent))
}
exports.scriptsProd = scriptsProd;

function scriptsBabel() {

	return src(scriptsGlob)
		.pipe(plumber())
		.pipe(concat("functions.js"))
		.pipe(babel({
			presets: ['@babel/env'],
			plugins: ["@babel/plugin-proposal-class-properties"]
		}))
		.pipe(dest(path.temp))
}
exports.scriptsBabel = scriptsBabel;


// Css
function css() {
	return src(path.srcScss + "style.scss")
		.pipe(bulkSass())
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(
			sass({
				outputStyle: "expanded"
			})
		)
		.pipe(autoprefixer({
			overrideBrowserslist: [
				"> 1%",
				"last 2 versions",
				"IE 11"
			]
		}))
		.pipe(
			postcss([
				emMediaQuery({
					precision: 3
				}),
				purgecss({
					content: purgeSettings.content,
					css: purgeSettings.input,
					whitelist: purgeSettings.whitelist
				}),
				cssnano(),
				pxtorem({
					rootValue: 16,
					propList: ['*'],
					selectorBlackList: [/^body$/]
				})
			])
		)
		.pipe(sourcemaps.write("."))
		.pipe(dest(path.build))
		.pipe(dest(themePath))
		.pipe(browsersync.stream());
}
exports.css = css;

function cssProd() {

	createVersionsFile();
	cleanFolderWithNFolders(themePath + "assets/css", 5);
	var StampCurrent = getStamp();

	var dir = themePath + 'panda/';
	var file = dir + versionsAssetsFileName;

	if (fs.existsSync(file)) {
		const options = {
			files: file,
			from: /ASSETS_STYLE_VERSION","([0-9]*)/g,
			to: 'ASSETS_STYLE_VERSION","' + StampCurrent
		};
		replaceInFile(options);

	}

	return src(themePath + "style.css")
		.pipe(dest(themePath + "assets/css/" + StampCurrent))
}
exports.cssProd = cssProd;

function createVersionsFile() {
	var dir = themePath + 'panda/';
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	var file = dir + versionsAssetsFileName;
	if (!fs.existsSync(file)) {
		fs.writeFileSync(file,
			'<?php' +
			'\r\n' +
			'define("ASSETS_STYLE_VERSION","12345");' +
			'\r\n' +
			'define("ASSETS_JS_VERSION","12345");'
		);
	}
}

function cleanFolderWithNFolders(path, numberOfFolders) {
	fs.readdir(path, (err, files) => {
		if (Array.isArray(files) && files.length > numberOfFolders) {
			fs.removeSync(path);
		}
	});
}


// Images
function compressImages() {
	return src(globImagesSrc.raster)
		.pipe(newer(path.buildImages))
		.pipe(tinypng({
			key: ApiKeyTinyPng,
			log: true
		}))
		.pipe(dest(path.buildImages));
};
exports.compressImages = compressImages;

function copyContentImages() {
	return src(globImagesSrc.content)
		.pipe(dest(path.buildImages + "content/"))
		.pipe(browsersync.stream());

}
exports.copyContentImages = copyContentImages;

function webpImages() {
	return src(globImagesSrc.webp)
		.pipe(newer(path.buildImages))
		.pipe(webp())
		.pipe(dest(path.buildImages))
		.pipe(browsersync.stream());
};
exports.webpImages = webpImages;

function svgMin() {
	return src(globImagesSrc.svg)
		.pipe(newer(path.buildImages))
		.pipe(
			svgo({
				plugins: [{
						removeViewBox: false
					},
					{
						cleanupNumericValues: {
							floatPrecision: 2
						}
					}
				]
			})
		)
		.pipe(dest(path.buildImages))
		.pipe(browsersync.stream());
};
exports.svgMin = svgMin;


// Versions
function cssVersion() {
	return src(path.components + "layout-base/layout-base.njk")
		.pipe(replace(/style.css\?([0-9]*)/g, "style.css?" + getStamp()))
		.pipe(dest(path.components + "layout-base/"));
}
exports.cssVersion = cssVersion;

function jsVersion() {
	return src(path.components + "layout-base/layout-base.njk")
		.pipe(replace(/functions.min.js\?([0-9]*)/g, "functions.min.js?" + getStamp()))
		.pipe(dest(path.components + "layout-base/"));
}
exports.jsVersion = jsVersion;

// Copy Tasks

function copyCssTheme() {
	return src(path.build + "style.css")
		.pipe(dest(themePath))
}
exports.copyCssTheme = copyCssTheme;

function copyJsTheme() {
	return src(path.buildJs + "functions.min.js")
		.pipe(dest(themePath))
}
exports.copyJsTheme = copyJsTheme;

function copyImagesTheme() {
	return src([path.buildImages + "/**/*", "!" + path.buildImages + "content/**/*"])
		.pipe(dest(themePath + "images/"))
}
exports.copyImagesTheme = copyImagesTheme;

function copyFaviconFiles() {
	return src(path.srcImages + "favicon/*.{xml,ico,webmanifest}")
		.pipe(dest(path.buildImages + "favicon/"))
}
exports.copyFaviconFiles = copyFaviconFiles;

// Delete Tasks

function deleteImagesTheme() {
	return del(themePath + "images/**/*", {
		force: true
	});
}
exports.deleteImagesTheme = deleteImagesTheme;

//Index rendering

function renderIndex() {
	return src(path.build + "index.html")
		.pipe(inject(
			src([path.build + "/*.html", "!" + path.build + "index.html"], {
				read: false
			}), {
				transform: function (filepath) {
					filepathFilter = filepath.replace("/build/", "");
					if (filepathFilter.slice(-5) === ".html") {
						return "<li><a href=\"" + filepathFilter + "\">" + filepathFilter + "</a></li>";
					}
					// Use the default transform as fallback:
					return inject.transform.apply(inject.transform, arguments);
				}
			}
		))
		.pipe(dest(path.build));
};
exports.renderIndex = renderIndex;


// helper function

function fileHandler(file) {
	var filePathFromSrc = filePath.relative(filePath.resolve(path.srcImages), file);
	var destFilePath = filePath.resolve(path.buildImages, filePathFromSrc);
	del.sync(destFilePath);
	if (filePathFromSrc.indexOf("favicon") === -1 || filePathFromSrc.indexOf("content") === -1) {
		var destFilePathWebp = destFilePath.replace('.png', '.webp').replace('.jpg', '.webp');
		del.sync(destFilePathWebp);
	}
}

// Watch files

function watchFilesDev() {
	watch([path.srcScss + "**/*.scss", path.components + "**/*.scss"], buildCss);
	watch([path.srcJs + "*.js", path.components + "**/*.js"], buildJs);
	watch([path.layouts + "**/*.njk", path.components + "**/*.njk", path.src + "data.json"], buildHtml);

	watch(globImagesSrc.webp, webpImages);
	watch(path.buildImages + "**/*.{png,jpg,jpeg,svg}", themeImages);

	watch(globImagesSrc.content, copyContentImages).on('unlink', function (file) {
		fileHandler(file);
	});

	watch(globImagesSrc.raster, compressImages).on('unlink', function (file) {
		fileHandler(file);
	});

	watch(globImagesSrc.svg, svgMin).on('unlink', function (file) {
		fileHandler(file);
	});
}
exports.watchFilesDev = watchFilesDev;

// Complex tasks
const buildHtml = series(nunjucks, renderIndex, htmlBeauty);
exports.buildHtml = buildHtml;

const buildCss = series(css, cssVersion);
exports.buildCss = buildCss;

const buildCssProd = series(css, cssProd);
exports.buildCssProd = buildCssProd;

const buildJs = series(scriptsBabel, scripts, jsVersion);
exports.buildJs = buildJs;

const buildJsProd = series(scriptsBabel, scripts, scriptsProd);
exports.buildJsProd = buildJsProd;

const themeImages = series(deleteImagesTheme, copyImagesTheme);
exports.themeImages = themeImages;

const themeFiles = parallel(themeImages, copyCssTheme, copyJsTheme);
exports.themeFiles = themeFiles;

const buildImages = parallel(svgMin, webpImages, compressImages, copyContentImages, copyFaviconFiles);
exports.buildImages = buildImages;

const buildDev = parallel(buildImages, series(series(buildCss, buildJs), buildHtml), themeImages)
exports.buildDev = buildDev;

const buildVersionsAssets = series(buildCssProd, buildJsProd);
exports.buildVersionsAssets = buildVersionsAssets;

// watch tasks

const watchDev = series(buildDev, parallel(watchFilesDev, browserSync));
exports.watchDev = watchDev;

exports.default = watchDev;