/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./static/index.scss":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./static/index.scss ***!
  \**************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./static/index.js":
/*!*************************!*\
  !*** ./static/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_modules_Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/modules/Router.js */ "./static/js/modules/Router.js");
/* harmony import */ var _js_modules_NetworkHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/modules/NetworkHandler.js */ "./static/js/modules/NetworkHandler.js");
/* harmony import */ var _js_views_MenuView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/views/MenuView.js */ "./static/js/views/MenuView.js");
/* harmony import */ var _js_views_LoginView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/views/LoginView.js */ "./static/js/views/LoginView.js");
/* harmony import */ var _js_views_LogoutView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/views/LogoutView.js */ "./static/js/views/LogoutView.js");
/* harmony import */ var _js_views_SignupView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/views/SignupView.js */ "./static/js/views/SignupView.js");
/* harmony import */ var _js_views_LeaderboardView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/views/LeaderboardView.js */ "./static/js/views/LeaderboardView.js");
/* harmony import */ var _js_views_GameView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/views/GameView.js */ "./static/js/views/GameView.js");
/* harmony import */ var _js_views_PaymentsView_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/views/PaymentsView.js */ "./static/js/views/PaymentsView.js");
/* harmony import */ var _js_views_ShopView_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/views/ShopView.js */ "./static/js/views/ShopView.js");

 // import './js/modules/ws.js';




 // import CountdownView from './js/views/CountdownView.js';




 // if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js')
//     .then((reg) => {
//         console.log('sw reg success:', reg);
//     })
//     .catch((err) => {
//         console.error('sw reg err:', err);
//     });
// }

var router = new _js_modules_Router_js__WEBPACK_IMPORTED_MODULE_0__["default"](document.body);
router.add('/', _js_views_MenuView_js__WEBPACK_IMPORTED_MODULE_2__["default"]); // router.add('/countdown', CountdownView);

router.add('/login', _js_views_LoginView_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
router.add('/logout', _js_views_LogoutView_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
router.add('/signup', _js_views_SignupView_js__WEBPACK_IMPORTED_MODULE_5__["default"]);
router.add('/leaderboard', _js_views_LeaderboardView_js__WEBPACK_IMPORTED_MODULE_6__["default"]);
router.add('/play', _js_views_GameView_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
router.add('/payout', _js_views_PaymentsView_js__WEBPACK_IMPORTED_MODULE_8__["default"]);
router.add('/shop', _js_views_ShopView_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
router.run();

/***/ }),

/***/ "./static/index.scss":
/*!***************************!*\
  !*** ./static/index.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/src!../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./static/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./static/js/components/LeaderboardComponent/LeaderboardComponent.js":
/*!***************************************************************************!*\
  !*** ./static/js/components/LeaderboardComponent/LeaderboardComponent.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LeaderboardComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeaderboardComponent =
/*#__PURE__*/
function () {
  /**
  * Конструктор
  * @param {Object} parentElement - Элемент DOM дерева,
  * куда будет отрисовываться leader board.
  */
  function LeaderboardComponent() {
    var parentElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var usersPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    var totalPages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    _classCallCheck(this, LeaderboardComponent);

    // Поля таблицы
    this._parentElement = parentElement;
    this._usersArr = {}; // Поля пагинатора

    this._usersPerPage = usersPerPage;
    this._pagesDict = {
      _currentPage: 1,
      _totalPages: totalPages
    }; // Блок пагинатора

    this._paginatorSection = this._parentElement;
  }

  _createClass(LeaderboardComponent, [{
    key: "_renderPaginator",
    value: function _renderPaginator(offset) {
      // Шаблон без div, так как div прописан в шаблоне борды
      var templateScript = '';

      if (this._pagesDict._currentPage > 1) {
        templateScript += '<button href="/leaderboard?offset={{prev}}" class="prev leaderboard_page-button"><i class="fas fa-arrow-left"></i></button>';
      } else {
        templateScript += '<button class="leaderboard_page-button-inactive"><i class="fas fa-arrow-left"></i></button>';
      }

      templateScript += '<h1 class="leaderboard_page-pageNumber">{{curr}}</h1>';
      console.log(this._pagesDict._totalPages, this._pagesDict._currentPage);

      if (this._pagesDict._currentPage < this._pagesDict._totalPages) {
        templateScript += '<button href="/leaderboard?offset={{next}}" class="next leaderboard_page-button"><i class="fas fa-arrow-right"></i></button>';
      } else {
        templateScript += '<button class="leaderboard_page-button-inactive"><i class="fas fa-arrow-right"></i></button>';
      }

      console.log(templateScript);
      var template = Handlebars.compile(templateScript);
      var data = {
        prev: offset - 1,
        curr: offset,
        next: offset + 1
      };
      this._paginatorSection.innerHTML += template(data);
    } // Методы борды

    /**
     * Геттер данных о пользователях.
     */

  }, {
    key: "render",

    /**
     * Метод для отрисоки leader board.
     * @param {array} users - массив данных о пользователях.
     */
    value: function render(offset) {
      this._pagesDict._currentPage = offset; // Итерируясь по юзерам, выводим строки таблицы
      // Зарание создал место для пагинатора: <div class="paginatorSection"></div>

      var templateScript = "\n\t\t<div class=\"leaderboard\">\n\t\t\t<h1 class=\"leaderboard__title\">LEADERBOARD</h1>\n\t\t\t<div class=\"board\">\n\t\t\t\t{{#each .}}\n\t\t\t\t<div class=\"board__player\">\n\t\t\t\t\t<h3 class=\"board__player-place\">{{ID}}</h3>\n\t\t\t\t\t<h3 class=\"board__player-nickname\">{{nickname}}</h3>\n\t\t\t\t\t<h3 class=\"board__player-points\">{{Points}}</h3>\n\t\t\t\t</div>\n\t\t\t\t{{/each}} \n\t\t\t</div>\n\t\t\t<div class=\"paginator-section\"></div>\n\t\t\t<button class=\"leaderboard_back-button\" href=\"/\" data-section=\"menu\"><i href=\"/\" class=\"fas fa-chevron-left\"></i>\n\t\t\t</button>\n\t\t</div>\n\t\t";
      var template = Handlebars.compile(templateScript);
      this._parentElement.innerHTML = template(this._usersArr); // Вытаскиваю из DOM'а <div class="paginatorSection"></div>, записываю его в 
      // _paginatorSection: 

      this._paginatorSection = this._parentElement.querySelector('.paginator-section'); // Рендерю пагинатор в _paginatorSection

      this._renderPaginator(offset);
    }
  }, {
    key: "users",
    get: function get() {
      return this._usersArr;
    }
    /**
     * Сеттер данных о пользователях.
    */
    ,
    set: function set() {
      var users = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this._usersArr = users;
    }
  }]);

  return LeaderboardComponent;
}();



/***/ }),

/***/ "./static/js/components/LoginComponent/LoginComponent.js":
/*!***************************************************************!*\
  !*** ./static/js/components/LoginComponent/LoginComponent.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginComponent =
/*#__PURE__*/
function () {
  function LoginComponent() {
    _classCallCheck(this, LoginComponent);
  }

  _createClass(LoginComponent, [{
    key: "render",

    /**
     * Функция, возвращающая строку в формате html с формой логина.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    value: function render(isAuth) {
      var templateScript = "";

      if (isAuth) {
        templateScript = "\n                <h1 class=\"title\">\u0412\u044B \u0443\u0436\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B</h1>\n\t\t\t\t<a href=\"/\" class=\"btn\">\u041D\u0430\u0437\u0430\u0434</a>\n            ";
      } else {
        templateScript = "\n\t\t\t\t<div class=\"login\">\n\t\t\t\t\t<h1 class=\"login__title\">Login</h1>\t\n\t\t\t\t\t<form id=\"login-form\" class=\"login-form\">\n\t\t\t\t\t\t<div class = \"login__input-border\">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tname=\"login\"\n\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\tplaceholder=\"Nickname\"\n\t\t\t\t\t\t\t\tclass=\"login__input\"\n\t\t\t\t\t\t\t\tid=\"login__input-login\"\n\t\t\t\t\t\t\t\tautocomplete=\"on\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class = \"login__input-border\">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tname=\"password\"\n\t\t\t\t\t\t\t\ttype=\"password\"\n\t\t\t\t\t\t\t\tplaceholder=\"Password\"\n\t\t\t\t\t\t\t\tclass=\"login__input\"\n\t\t\t\t\t\t\t\tid=\"login__input-password\"\n\t\t\t\t\t\t\t\tautocomplete=\"on\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t</div>\n                        <div id=\"login__authorization-error-field\" class=\"login_error_text\"></div>\n                        <div class=\"login__btn\">\n                        </div>\n\t\t\t\t\t\t<div class=\"login__btn-section\">\n\t\t\t\t\t\t\t<button href=\"/\" class=\"login-btn\"><i href=\"/\" class=\"fas fa-chevron-left\"></i></button>\n\t\t\t\t\t\t\t<button href=\"/authorizeuser\" class=\"login-btn\"><i href=\"/authorizeuser\" class=\"fas fa-angle-double-right\"></i></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t";
      }

      var template = Handlebars.compile(templateScript);
      return template();
    }
  }, {
    key: "setOnChangeListener",
    value: function setOnChangeListener(input) {
      var _this = this;

      input.addEventListener("input", function () {
        _this.goodField(input); // this.setErrorText("");
        // this.style.background-color = 'white';

      });
    }
  }, {
    key: "setErrorText",
    value: function setErrorText(text) {
      if (typeof text !== 'string') {
        console.log('NOTE: text is not string');
        return;
      }

      var errorField = document.getElementById('login__authorization-error-field');
      errorField.textContent = text;
    }
  }, {
    key: "goodField",
    value: function goodField(input) {
      input.setCustomValidity("");
    }
  }, {
    key: "errorField",
    value: function errorField(input) {
      input.setCustomValidity("-_-");
    }
  }, {
    key: "login",
    get: function get() {
      return document.getElementById('login__input-login');
    }
  }, {
    key: "password",
    get: function get() {
      return document.getElementById('login__input-password');
    }
  }]);

  return LoginComponent;
}();



/***/ }),

/***/ "./static/js/components/MenuComponent/MenuComponent.js":
/*!*************************************************************!*\
  !*** ./static/js/components/MenuComponent/MenuComponent.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuComponent; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuComponent =
/*#__PURE__*/
function () {
  function MenuComponent() {
    _classCallCheck(this, MenuComponent);
  }

  _createClass(MenuComponent, [{
    key: "render",
    value: function render(data) {
      console.log('profile Data:', data);
      var templateScript = "";

      if (_typeof(data) == 'object') {
        templateScript = "\n            <div class=\"menu\">\n                <h1 class=\"menu__title\">ADV<a class=\"hate\">HATER</a></h1>\n                <div class=\"main-bar\">\n                    <button class=\"main-bar__item menu_btn\" href=\"/leaderboard\" data-title=\"LEADERBOARD\" data-section=\"leaderboard\"><i class=\"fas fa-list-ul\"></i></button>\n                    <button class=\"main-bar__item menu_btn\" href=\"/payout\" data-title=\"PAYOUT\" data-section=\"payout\"><i class=\"fas fa-wallet\"></i></button>\n                    <button class=\"main-bar__item menu_btn\" href=\"/shop\" data-title=\"SHOP\" data-section=\"shop\"><i class=\"fas fa-shopping-cart\"></i></button>\n                </div>\n                <div class=\"menu__profile\">\n                    <img src=\"{{imgurl}}\" class=\"profile-avatar\"></img>\n                    <div class=\"profile-info\">\n                        <h4 class=\"profile-nickname\">{{nickname}}</h4>\n                        <h4 class=\"profile-score\">{{points}} $</h4>\n                    </div>\n                    <div class=\"menu__profile-buttons-section\" id=\"menu__profile-buttons-section\">\n                        <button class=\"profile-button\">Edit</button>\n                        <button href=\"/logout\" class=\"profile-button\">Logout</button>\n                    </div>\n                </div>\n                <button href=\"/play\" class=\"menu__play-btn\" data-section=\"play\"><i href=\"/play\" class=\"fas fa-play\"></i></button>\n                <div class=\"options\">\n                    <a href=\"#\" class=\"options__link\">Report bug</a>\n                    <a href=\"#\" class=\"options__link\">Help</a>\n                    <a href=\"#\" class=\"options__link\">Hate with us!</a>\n                </div>  \n            </div>\n        ";
      } else {
        templateScript = "\n                <div class=\"chose\">\n                    <h1 class=\"chose__title\">ADVHATER</h1>\n                    <div class=\"main-bar\">\n                        <button href=\"/signup\" class=\"main-bar__item chose_btn\" data-title=\"SIGNUP\" data-section=\"signup\"><i href=\"/signup\" class=\"fas fa-user-plus\"></i></button>\n                        <button href=\"/payout\" class=\"main-bar__item chose_btn\" data-title=\"QUICK PO\" data-section=\"chose\"><i href=\"/payout\" class=\"fas fa-wallet\"></i></button>\n                        <button href=\"/login\" class=\"main-bar__item chose_btn\" data-title=\"LOGIN\" data-section=\"login\"><i href=\"/login\" class=\"fas fa-sign-in-alt\"></i></button>\n                    </div> \n                </div>\n            ";
      }

      var template = Handlebars.compile(templateScript);
      return template(data);
    }
  }, {
    key: "_doSmt",
    value: function _doSmt() {
      console.log("i am not private");
    }
  }]);

  return MenuComponent;
}();



/***/ }),

/***/ "./static/js/components/PaymentsComponent/PaymentsComponents.js":
/*!**********************************************************************!*\
  !*** ./static/js/components/PaymentsComponent/PaymentsComponents.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PaymentsComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PaymentsComponent =
/*#__PURE__*/
function () {
  function PaymentsComponent() {
    _classCallCheck(this, PaymentsComponent);
  }

  _createClass(PaymentsComponent, [{
    key: "render",

    /**
     * Функция, возвращающая строку в формате html с формой выплаты.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    value: function render(isAuth) {
      var templateScript = "";

      if (isAuth) {
        templateScript = "\n                <div class=\"payments\">\n                    <h1 class=\"payments__title\">Payments</h1>\n                    <form class=\"payments__input-section\" onsubmit=\"this.send()\" method=\"post\" id=\"contact_form\" required=\"\">\n                        <div class=\"payments__input-border\">\n                            <input class=\"payments__input-section-input\" type=\"text\" name=\"phone\" class=\"payments__phonenumber\" placeholder=\"9xxxxxxxxx\" required=\"\">\n                        </div>\n                        <div class=\"payments__input-border\">\n                            <input class=\"payments__input-section-input\" type=\"text\" name=\"amount\" placeholder=\"100 $\">\n                        </div>\n                        <button href=\"/\" class=\"payments__input-section-submit\" ><i class=\"fas fa-angle-left\"></i></button>\n                        <button href=\"/payout\" class=\"payments__input-section-submit\" type=\"submit\" id=\"form_button\">Submit</button>\n                    </form>\n                </div>\n            ";
      } else {
        templateScript = "\n                <div class=\"chose\">\n                    <h1 class=\"chose__title\">Payment</h1>\n                    <div class=\"main-bar\">\n                        <button href=\"/signup\" class=\"main-bar__item chose_btn_pay\" data-title=\"SIGNUP\" data-section=\"signup\"><i href=\"/signup\" class=\"fas fa-user-plus\"></i></button>\n                        <button href=\"/login\" class=\"main-bar__item chose_btn_pay\" data-title=\"LOGIN\" data-section=\"login\"><i href=\"/login\" class=\"fas fa-sign-in-alt\"></i></button>\n                    </div> \n                    <h3 class=\"chose__title\">login or signup please</h3>\n                </div>\n\t\t\t";
      }

      var template = Handlebars.compile(templateScript);
      return template();
    }
  }]);

  return PaymentsComponent;
}();



/***/ }),

/***/ "./static/js/components/ShopComponent/ShopComponent.js":
/*!*************************************************************!*\
  !*** ./static/js/components/ShopComponent/ShopComponent.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShopComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShopComponent =
/*#__PURE__*/
function () {
  function ShopComponent(root, weapons) {
    _classCallCheck(this, ShopComponent);

    this.weapons = weapons;
    this.root = root;
  }

  _createClass(ShopComponent, [{
    key: "render",
    value: function render() {
      var templateScript = "\n            <div class=\"shop-background\">\n                <div class=\"shop-container\">\n                    <div class=\"shop__menu\">\n                        {{#each .}}\n                        <div class=\"shop__menu-item\" data-section=\"{{id}}\"><img src=\"{{icon}}\" alt=\"{{name}} data-section=\"{{id}}\"></div>\n                        {{/each}}\n                    </div>\n                    <div class=\"weapon__about\">\n                    </div>\n                </div>\n            </div>\n        ";
      var template = Handlebars.compile(templateScript);
      this.root.innerHTML = template(this.weapons);
    }
  }, {
    key: "renderWeaponInfo",
    value: function renderWeaponInfo(id) {
      var about = document.querySelector('.weapon__about');
      var templateScript = "\n            <h1 class=\"weapon__about-name\">{{name}}</h1>\n            <div class=\"weapon__about-main\">\n                <img src=\"{{icon}}\" alt=\"weapon\" class=\"weapon__about-main-image\">\n                <button class=\"weapon__about-main-purchase\" data-section=\"{{id}}\">Buy</button>\n            </div>\n            <div class=\"weapon__about-info\">\n                <div class=\"weapon__about-info-property\">\n                    <div class=\"weapon__about-info-property-item\">\n                        <img src=\"../../../icons/property/cost.svg\" alt=\"cost\">\n                        <h2>{{cost}}</h2>\n                    </div>\n                    <div class=\"weapon__about-info-property-item\">\n                        <img src=\"../../../icons/property/damage.svg\" alt=\"damage\">\n                        <h2>{{damage}}</h2>\n                    </div>\n                    <div class=\"weapon__about-info-property-item\">\n                        <img src=\"../../../icons/property/firerate.svg\" alt=\"firerate\">\n                        <h2>{{fireRate}}</h2>\n                    </div>\n                </div>\n            </div>\n            <div class=\"weapon__about-info-description\">\n                <h3>{{about}}</h3>\t\n            </div>\n        ";
      var template = Handlebars.compile(templateScript);
      about.innerHTML = '';
      about.innerHTML = template(this.weapons[id]);
    }
  }]);

  return ShopComponent;
}();



/***/ }),

/***/ "./static/js/components/SignupComponent/SignupComponent.js":
/*!*****************************************************************!*\
  !*** ./static/js/components/SignupComponent/SignupComponent.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SignupComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SignupComponent =
/*#__PURE__*/
function () {
  function SignupComponent() {
    _classCallCheck(this, SignupComponent);
  }

  _createClass(SignupComponent, [{
    key: "render",

    /**
     * Функция, возвращающая строку html с формой логина.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    value: function render(isAuth) {
      var templateScript = '';

      if (isAuth) {
        templateScript = "\n                <h1 class=\"signup__title\">\u0412\u044B \u0443\u0436\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B</h1>\n\t\t\t\t<a href=\"/\" class=\"btn\">\u041D\u0430\u0437\u0430\u0434</a>\n            ";
      } else {
        templateScript = "\n                <div class=\"signup\">\n                    <h1 class=\"signup__title\">Sign Up</h1>\t\n                    <form id=\"signup-form\" class=\"signup-form\">\n                        <div class=\"signup__input-border\">\n                            <input\n                                name=\"nickname\"\n                                type=\"text\"\n                                placeholder=\"Username\"\n                                class=\"signup__input\"\n                                autocomplete=\"on\"\n                            >\n                        </div>\n                        <div class=\"signup__input-border\">\n                            <input\n                                name=\"email\"\n                                type=\"text\"\n                                placeholder=\"Email\"\n                                class=\"signup__input\"\n                                autocomplete=\"on\"\n                            >\n                        </div>\n                        <div class=\"signup__input-border\">\n                            <input\n                                name=\"password\"\n                                type=\"password\"\n                                placeholder=\"Password\"\n                                class=\"signup__input\"\n                                autocomplete=\"on\"\n                            >\n                        </div>\n                        <div class=\"signup__input-border\">\n                            <input\n                                name=\"password_repeat\"\n                                type=\"password\"\n                                placeholder=\"Repeat Password\"\n                                class=\"signup__input\"\n                            >\n                        </div>\n                        <div id=\"signup-form__error-text-field\" class=\"signup_error_text\"></div>  \n                        <div class=\"signup__btn-section\">\n                            <button href=\"/\" class=\"signup-btn\"><i href=\"/\" class=\"fas fa-chevron-left\"></i></button>\n                            <button href=\"/signupuser\" class=\"signup-btn\"><i href=\"/signupuser\" class=\"fas fa-angle-double-right\"></i></button>\n                        </div>\n                    </form>\n                </div>\n            ";
      }

      var template = Handlebars.compile(templateScript);
      return template();
    }
  }, {
    key: "setOnChangeListener",
    value: function setOnChangeListener(input) {
      var _this = this;

      input.addEventListener("input", function () {
        _this.goodField(input);
      });
    }
  }, {
    key: "setErrorText",
    value: function setErrorText(text) {
      if (typeof text !== 'string') {
        console.log('NOTE: text is not string');
        return;
      }

      var errorField = document.getElementById('signup-form__error-text-field');
      errorField.textContent = text;
    }
  }, {
    key: "goodField",
    value: function goodField(input) {
      input.setCustomValidity("");
    }
  }, {
    key: "errorField",
    value: function errorField(input) {
      input.setCustomValidity("-_-");
    }
  }, {
    key: "form",
    get: function get() {
      return document.querySelector('#signup-form');
    }
  }]);

  return SignupComponent;
}();



/***/ }),

/***/ "./static/js/game/configs/buffConfigs.js":
/*!***********************************************!*\
  !*** ./static/js/game/configs/buffConfigs.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var buffConfigs = {
  health: {
    name: 'health',
    value: 20,
    isTemporary: false
  },
  increaseHpCapacity: {
    name: 'increaseHpCapacity',
    value: 20,
    isTemporary: true,
    time: 30 * 1000
  },
  increaseVelocity: {
    name: 'increaseVelocity',
    value: 20,
    isTemporary: true,
    time: 15 * 1000
  }
};
/* harmony default export */ __webpack_exports__["default"] = (buffConfigs);

/***/ }),

/***/ "./static/js/game/dynamic/Adv.js":
/*!***************************************!*\
  !*** ./static/js/game/dynamic/Adv.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Adv; });
/* harmony import */ var _DynamicEssence_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicEssence.js */ "./static/js/game/dynamic/DynamicEssence.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Adv =
/*#__PURE__*/
function (_DynamicEssence) {
  _inherits(Adv, _DynamicEssence);

  function Adv() {
    var _this;

    _classCallCheck(this, Adv);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Adv).apply(this, arguments));
    _this.xPrev = _this.xPos;
    _this.yPrev = _this.yPos;
    _this.curTargetX;
    _this.curTargetY;
    _this.centerX;
    _this.centerY;
    _this.advUrl = 'http://ya.ru';
    _this.teta;
    _this.color = 9100;
    return _this;
  }

  _createClass(Adv, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
      ctx.fillStyle = '#ff' + this.color;
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "logic",
    value: function logic(curTargetX, curTargetY) {
      this.centerY = this.yPos + this.ySize / 2;
      this.centerX = this.xPos + this.xSize / 2;
      this.curTargetX = curTargetX;
      this.curTargetY = curTargetY;
      this.teta = Math.atan2(this.curTargetX - this.xPos, this.curTargetY - this.yPos);
      this.xPrev = this.xPos;
      this.yPrev = this.yPos;
      this.xPos += this.velocity * Math.sin(this.teta);
      this.yPos += this.velocity * Math.cos(this.teta);
    }
  }, {
    key: "interact",
    value: function interact(obj) {
      if (obj.name == 'bullet') {
        this.hp -= 5;
        this.xPos = this.xPrev;
        this.yPos = this.yPrev;
        this.color -= 400;
        return this.hp;
      } else if (obj.name == 'player') {
        this.hp = 0;
        window.open(this.advUrl);
        return this.hp;
      } else if (obj.name == 'barrier') {
        // if (Math.abs(obj.xPos - this.curTargetX) >= Math.abs(obj.xPos + obj.xSize - this.curTargetX)) {
        //     this.xPos = this.xPrev + this.velocity;
        //     this.yPos = this.yPrev;
        // } else if (Math.abs(obj.xPos - this.curTargetX) < Math.abs(obj.xPos + obj.xSize - this.curTargetX)) {
        //     this.xPos = this.xPrev - this.velocity;
        //     this.yPos = this.yPrev
        // }
        // if (Math.abs(obj.yPos - this.curTargetY) >= Math.abs(obj.yPos + obj.ySize - this.curTargetY)) {
        //     this.yPos = this.yPrev + this.velocity;
        //     this.xPos = this.xPrev;
        // } else if (Math.abs(obj.yPos - this.curTargetY) < Math.abs(obj.yPos + obj.ySize - this.curTargetY)) {
        //     this.yPos = this.yPrev - this.velocity;
        //     this.xPos = this.xPrev;
        // }
        this.xPos = this.xPrev;
        this.yPos = this.yPrev;
      }
    }
  }]);

  return Adv;
}(_DynamicEssence_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/game/dynamic/DynamicEssence.js":
/*!**************************************************!*\
  !*** ./static/js/game/dynamic/DynamicEssence.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DynamicEssence; });
/* harmony import */ var _functions_KeyboardControl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/KeyboardControl.js */ "./static/js/game/functions/KeyboardControl.js");
/* harmony import */ var _functions_myMath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/myMath.js */ "./static/js/game/functions/myMath.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var DynamicEssence =
/*#__PURE__*/
function () {
  function DynamicEssence(xPos, yPos) {
    var xSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
    var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 40;
    var URL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/default_texture";
    var velocity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 100;

    _classCallCheck(this, DynamicEssence);

    this.keyHandler = new _functions_KeyboardControl_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.myMath = new _functions_myMath_js__WEBPACK_IMPORTED_MODULE_1__["default"](); // Основные параметры

    this.hp = 100; // %

    this.hpCapacity = 100; // у.е

    this.velocity = velocity; // у.е
    // Координаты

    this.xPos = xPos;
    this.yPos = yPos; // Позиция прицела - только у плеера

    this.xAim = 0;
    this.yAim = 0; // Его размеры 

    this.xSize = xSize; // vh

    this.ySize = ySize; // vh

    this.teta = 0; // Тип оружия - только для usera 
    // this.melle = true;
    // this.gunId = 0; // 0 - knife
    // Бафы - только для usera 
    // this.bufs = {} // "key" : {}
    // Шмот
    // this.skinId = 0; // для игрока

    this.texture = URL; // URL 
    // this.immortal = false; // для рекламы
  } // Логика перемещения только для рекламы 


  _createClass(DynamicEssence, [{
    key: "logic",
    value: function logic(screenWidth, screenHeight) {
      var keys = this.keyHandler.handleKey();
      var y = this.yPos + this.ySize / 2;
      var x = this.xPos + this.xSize / 2;
      this.teta = this.myMath.get0toCor(x, y, keys['mouseX'], keys['mouseY']);

      if (keys['right']) {
        this.xPos += this.velocity;
      }

      if (keys['left']) {
        this.xPos -= this.velocity;
      }

      if (keys['up']) {
        this.yPos -= this.velocity;
      }

      if (keys['down']) {
        this.yPos += this.velocity;
      } // if (this.xPos < 0) {
      //     this.xPos = canvas.width;
      // }
      // else if (this.xPos > canvas.width)
      //     this.xPos = 0;
      // if (this.yPos < 0) {
      //     this.yPos = canvas.height;
      // }
      // else if (this.yPos > canvas.height) 
      //     this.yPos = 0;

    }
  }, {
    key: "interact",
    value: function interact() {}
  }]);

  return DynamicEssence;
}();



/***/ }),

/***/ "./static/js/game/dynamic/Player.js":
/*!******************************************!*\
  !*** ./static/js/game/dynamic/Player.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bullet.js */ "./static/js/game/dynamic/bullet.js");
/* harmony import */ var _DynamicEssence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DynamicEssence.js */ "./static/js/game/dynamic/DynamicEssence.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import KeyboardControl from '../functions/KeyboardControl.js'



var Player =
/*#__PURE__*/
function (_DynamicEssence) {
  _inherits(Player, _DynamicEssence);

  function Player() {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments)); // this.keyHandler = new KeyboardControl();

    _this.name = 'player';
    _this.defaultVelocity = _this.velocity;
    _this.buffs = [];
    _this.centerX;
    _this.centerY;
    _this.inShop;
    _this.currentShop;
    _this.xPrev = _this.xPos;
    _this.yPrev = _this.yPos;
    return _this;
  }

  _createClass(Player, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
      ctx.fillStyle = "#48F67F";
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "logic",
    value: function logic(eventsMap, cvsWidth, cvsHeight) {
      var that = this;

      this._logicBuffs();

      this.centerY = this.yPos + this.ySize / 2;
      this.centerX = this.xPos + this.xSize / 2; // console.log(eventsMap['mouseX'], eventsMap['mouseY'])
      // this.teta = this.myMath.getTeta(this.centerX, this.centerY, eventsMap['mouseX'], eventsMap['mouseY']);
      // console.log('this.teta',this.teta);

      if (eventsMap['right']) {
        this.xPrev = this.xPos;
        this.xPos += this.velocity;
      } else if (eventsMap['left']) {
        this.xPrev = this.xPos;
        this.xPos -= this.velocity;
      }

      if (eventsMap['up']) {
        this.yPrev = this.yPos;
        this.yPos -= this.velocity;
      } else if (eventsMap['down']) {
        this.yPrev = this.yPos;
        this.yPos += this.velocity;
      }

      if (this.inShop) {
        // console.log(this.currentShop);
        if (eventsMap['interact']) {
          this.currentShop.open(this.inShop);
        } else {
          this.currentShop.close();
        }
      }

      if (this.xPos <= 0 || this.xPos >= cvsWidth || this.yPos <= 0 || this.yPos >= cvsHeight) {
        this.interact();
      }
    }
  }, {
    key: "interact",
    value: function interact(name) {
      var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // console.log(name);
      if (name == 'adv') {
        this.hp -= 95;
      } else if (name == 'shop') {
        this.inShop = true;
        this.currentShop = obj;
      } else {
        this.xPos = this.xPrev;
        this.yPos = this.yPrev;
      }
    }
  }, {
    key: "_addHp",
    value: function _addHp(hp) {
      if (this.hp + hp >= this.hpCapacity) {
        this.hp = this.hpCapacity;
      } else {
        this.hp += hp;
      }
    }
  }, {
    key: "_logicBuffs",
    value: function _logicBuffs() {
      var _this2 = this;

      var buffs = this.buffs;
      this.buffs = []; // // console.log(buffs);

      buffs.forEach(function (buff) {
        if (Date.now() - buff.startTime < buff.buff.time) {
          _this2.buffs[_this2.buffs.length] = buff;
        } else {
          if (buff.buff.name == 'increaseHpCapacity') {
            _this2.hpCapacity = buff.buff.value;

            if (_this2.hp > _this2.hpCapacity) {
              _this2.hp = _this2.hpCapacity;
            }
          } else if (buff.buff.name == 'increaseVelocity') {
            _this2.velocity -= buff.buff.value;
          }
        }
      });
    }
  }, {
    key: "addBuff",
    value: function addBuff(person, buff) {
      if (buff.isTemporary) {
        this.buffs[this.buffs.length] = {
          buff: buff,
          startTime: Date.now()
        };

        switch (buff.name) {
          case 'increaseHpCapacity':
            // eslint-disable-next-line no-case-declarations
            var prevHpCapacity = this.hpCapacity;
            person.hpCapacity = this.hpCapacity;
            person.hp *= 1 + this.hpCapacity / prevHpCapacity;
            break;

          case 'increaseVelocity':
            person.velocity += buff.value; // console.log(person.velocity);

            break;
        }
      } else {
        switch (buff.name) {
          case 'health':
            this._addHp(buff.value);

            break;
        }
      }
    }
  }]);

  return Player;
}(_DynamicEssence_js__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./static/js/game/dynamic/bullet.js":
/*!******************************************!*\
  !*** ./static/js/game/dynamic/bullet.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bulelt; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bulelt =
/*#__PURE__*/
function () {
  function Bulelt(xPos, yPos) {
    var xSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
    var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 40;
    var URL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/default_texture";
    var velocity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 100;
    var xDestination = arguments.length > 6 ? arguments[6] : undefined;
    var yDestination = arguments.length > 7 ? arguments[7] : undefined;

    _classCallCheck(this, Bulelt);

    this.xSize = xSize; // vh

    this.ySize = ySize; // vh

    this.xPos = xPos;
    this.yPos = yPos;
    this.name = 'bullet';
    this.texture = URL; // URL 

    this.velocity = velocity; // у.е

    this.xDestination = xDestination;
    this.yDestination = yDestination;
    this.teta = Math.atan2(this.xDestination - this.xPos, this.yDestination - this.yPos);
    console.log(this.xDestination, this.yDestination);
  }

  _createClass(Bulelt, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "go",
    value: function go() {
      this.xPos += this.velocity * Math.sin(this.teta);
      this.yPos += this.velocity * Math.cos(this.teta);
    }
  }, {
    key: "interact",
    value: function interact() {}
  }]);

  return Bulelt;
}();



/***/ }),

/***/ "./static/js/game/functions/Handler.js":
/*!*********************************************!*\
  !*** ./static/js/game/functions/Handler.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Handler; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Handler =
/*#__PURE__*/
function () {
  function Handler(canvas) {
    _classCallCheck(this, Handler);

    this.canvas = canvas;
    this.eventsMap = {
      // Нажатие клавиш
      'up': false,
      'left': false,
      'down': false,
      'right': false,
      'interact': false,
      // Нажатие мышки
      'mouseClick': false,
      // Координаты мышки
      'mouseX': 0,
      'mouseY': 0
    };
    this.bounds = this.canvas.getBoundingClientRect();

    this._listenEvents();
  }

  _createClass(Handler, [{
    key: "_listenEvents",
    value: function _listenEvents() {
      var that = this;
      document.addEventListener('keydown', keyDownHandler, false);
      document.addEventListener('keyup', keyUpHandler, false);
      document.addEventListener('mousedown', mouseClickDown, false);
      document.addEventListener('mouseup', mouseClickUp, false);
      document.addEventListener('mousedown', keyDownHandler, false);

      document.body.onmousemove = function (evt) {
        that.eventsMap.mouseX = evt.pageX - that.bounds.left;
        that.eventsMap.mouseY = evt.pageY - that.bounds.top;
      };

      function mouseClickDown() {
        that.eventsMap.mouseClick = true;
      }

      function mouseClickUp() {
        that.eventsMap.mouseClick = false;
      }

      function keyDownHandler(e) {
        if (e.code == "KeyD" || e.code == "ArrowRight") {
          that.eventsMap['right'] = true;
        } else if (e.code == "KeyA" || e.code == "ArrowLeft") {
          that.eventsMap['left'] = true;
        } else if (e.code == "KeyW" || e.code == "ArrowUp") {
          that.eventsMap['up'] = true;
        } else if (e.code == "KeyS" || e.code == "ArrowDown") {
          that.eventsMap['down'] = true;
        }

        if (e.code == 'KeyE') {
          if (that.eventsMap['interact']) {
            that.eventsMap['interact'] = false;
          } else {
            that.eventsMap['interact'] = true;
          }
        }
      }

      function keyUpHandler(e) {
        if (e.code == "KeyD" || e.code == "ArrowRight") {
          that.eventsMap['right'] = false;
        } else if (e.code == "KeyA" || e.code == "ArrowLeft") {
          that.eventsMap['left'] = false;
        } else if (e.code == "KeyW" || e.code == "ArrowUp") {
          that.eventsMap['up'] = false;
        } else if (e.code == "KeyS" || e.code == "ArrowDown") {
          that.eventsMap['down'] = false;
        }
      } // function keyClick(e) {
      //     if(e.code == 'KeyE') {
      //         if (this.eventsMap['interact']) {
      //             this.eventsMap['interact'] = false ;
      //         } else {   
      //             this.eventsMap['interact'] = true;
      //         }
      //     }
      // }

    }
  }, {
    key: "addEventListener",
    value: function addEventListener(eventType, callback) {
      document.addEventListener(eventType, callback, false);
    }
  }, {
    key: "addObject",
    value: function addObject(name, obj) {
      this.objects[name] = obj;
    }
  }, {
    key: "sendEventMap",
    value: function sendEventMap() {
      return this.eventsMap;
    }
  }]);

  return Handler;
}();



/***/ }),

/***/ "./static/js/game/functions/KeyboardControl.js":
/*!*****************************************************!*\
  !*** ./static/js/game/functions/KeyboardControl.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeyboardControl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardControl = function KeyboardControl() {
  _classCallCheck(this, KeyboardControl);
} //     this.keys = {
//         'up': false,
//         'left': false,
//         'down': false,
//         'right': false,
//         'mouseClick' : false,
//         'mouseX' : 0,
//         'mouseY' : 0
//     }
//     const that = this;
//     this.mouseX = 0;
//     this.mouseY = 0;
//     document.addEventListener('keydown', keyDownHandler, false);
//     document.addEventListener('keyup', keyUpHandler, false);
//     document.addEventListener('mousedown', mouseClick,false)
//     document.body.onmousemove = function(evt) {
//         that.keys.mouseX = evt.pageX;
//         that.keys.mouseY = evt.pageY;
//     }
//     function mouseClick() {
//         this.keys.mouseClick = true;
//     } 
// }
// handleKey() {
//     return this.keys;
// }
;



/***/ }),

/***/ "./static/js/game/functions/Screen.js":
/*!********************************************!*\
  !*** ./static/js/game/functions/Screen.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Screen; });
/* harmony import */ var _static_escape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/escape.js */ "./static/js/game/static/escape.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Screen =
/*#__PURE__*/
function () {
  function Screen() {
    var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    _classCallCheck(this, Screen);

    this._root = root; // Параметры canvas

    this._canvas = document.createElement('canvas');
    this.ctx;
    this._canvas.className = "gameScreen"; // Размеры карты (видимая область)

    this.width = window.innerWidth;
    this.height = window.innerHeight; // Параметры отображения текста

    this.fontCfg = '25px Arial';
    this.textPosY = 45;
  }

  _createClass(Screen, [{
    key: "_createMap",
    value: function _createMap() {}
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      this._root.innerHTML = '';
      this._canvas.width = this.width;
      this._canvas.height = this.height;

      this._root.appendChild(this._canvas);

      this.ctx = this._canvas.getContext('2d');
      return this._canvas;
    }
  }, {
    key: "render",
    value: function render() {
      var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.ctx.clearRect(0, 0, this.width, this.height);
      var that = this;
      objects['players'].forEach(function (obj) {
        obj.render(that.ctx); // that._renderEssence('players', obj);
      });
      objects['bullets'].forEach(function (obj) {
        obj.render(that.ctx);
      });
      objects['barriers'].forEach(function (obj) {
        obj.render(that.ctx);
      });
      objects['advs'].forEach(function (obj) {
        obj.render(that.ctx);
      });
      objects['shops'].forEach(function (obj) {
        obj.render(that.ctx);
      });
    }
  }, {
    key: "showInfo",
    value: function showInfo(score, health) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = this.fontCfg;
      this.ctx.fillText('score: ' + score, this.width / 2 - 250, this.textPosY);
      this.ctx.fillStyle = "red";
      this.ctx.font = this.fontCfg;
      this.ctx.fillText('hp: ' + health, this.width / 2, this.textPosY);
    }
  }, {
    key: "showPauseTime",
    value: function showPauseTime(time) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = this.fontCfg;
      this.ctx.fillText('pause: ' + time, this.width - 300, this.textPosY);
    }
  }, {
    key: "showWaveNumber",
    value: function showWaveNumber(number) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = this.fontCfg;
      this.ctx.fillText('Wave: ' + number, 100, this.textPosY);
    }
  }, {
    key: "canvas",
    set: function set(ctx) {
      this.ctx = ctx;
    }
  }]);

  return Screen;
}();



/***/ }),

/***/ "./static/js/game/functions/collisionHandler.js":
/*!******************************************************!*\
  !*** ./static/js/game/functions/collisionHandler.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CollisionHandler; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CollisionHandler =
/*#__PURE__*/
function () {
  function CollisionHandler() {
    _classCallCheck(this, CollisionHandler);
  }

  _createClass(CollisionHandler, [{
    key: "_getPairCollisions",

    /**
     * Функция возвращает массив пар {first: firstObj, second: secondObj}
     * @param {Array of } firstArr 
     * @param {Array of } secondArr 
     */
    value: function _getPairCollisions(firstArr, secondArr) {
      var _this = this;

      var pairs = [];
      firstArr.forEach(function (firstObj, fidx) {
        if (typeof firstObj !== 'undefined') {
          secondArr.forEach(function (secondObj, sidx) {
            if (typeof secondObj !== 'undefined') {
              if (_this._checkCollision(firstObj, secondObj)) {
                pairs = {
                  first: {
                    firstObj: firstObj,
                    fidx: fidx
                  },
                  second: {
                    secondObj: secondObj,
                    sidx: sidx
                  }
                };
              }
            } else {}
          });
        }
      });
      return pairs;
    }
  }, {
    key: "handleCollisions",
    value: function handleCollisions(objects) {
      var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var PlayerBarrierCollision = this._getPairCollisions(objects['players'], objects['barriers']);

      var BulletBarrierCollision = this._getPairCollisions(objects['bullets'], objects['barriers']);

      var BulletAdvsCollision = this._getPairCollisions(objects['bullets'], objects['advs']);

      var PlayersAdvsCollision = this._getPairCollisions(objects['players'], objects['advs']);

      var BarriersAdvsCollision = this._getPairCollisions(objects['barriers'], objects['advs']);

      var PlayersShopsCollision = this._getPairCollisions(objects['players'], objects['shops']);

      if (PlayerBarrierCollision.length != 0) {
        PlayerBarrierCollision.first.firstObj.interact();
        PlayerBarrierCollision.second.secondObj.interact();
      }

      if (BulletBarrierCollision.length != 0) {
        BulletBarrierCollision.first.firstObj.interact();
        objects['bullets'].splice(BulletBarrierCollision.first.fidx, 1);
        BulletBarrierCollision.second.secondObj.interact();
      }

      if (BulletAdvsCollision.length != 0) {
        BulletAdvsCollision.first.firstObj.interact();
        objects['bullets'].splice(BulletAdvsCollision.first.fidx, 1);
        var advHealth = BulletAdvsCollision.second.secondObj.interact(BulletAdvsCollision.first.firstObj);

        if (advHealth <= 0) {
          score.value += 100;
          objects['advs'].splice(BulletAdvsCollision.second.sidx, 1);
        }
      }

      if (PlayersAdvsCollision.length != 0) {
        PlayersAdvsCollision.first.firstObj.interact('adv');

        var _advHealth = PlayersAdvsCollision.second.secondObj.interact(PlayersAdvsCollision.first.firstObj);

        if (_advHealth <= 0) {
          score.value += 100;
          objects['advs'].splice(PlayersAdvsCollision.second.sidx, 1);
        }
      }

      if (BarriersAdvsCollision.length != 0) {
        BarriersAdvsCollision.first.firstObj.interact();
        BarriersAdvsCollision.second.secondObj.interact(BarriersAdvsCollision.first.firstObj);
      }

      if (PlayersShopsCollision.length != 0) {
        PlayersShopsCollision.first.firstObj.interact('shop', PlayersShopsCollision.second.secondObj);
        PlayersShopsCollision.second.secondObj.playerInShop = true;
      } else {
        if (objects['shops'].length != 0) {
          objects['shops'][0].playerInShop = false;
          objects['players'][0].inShop = false;
        }
      }
    }
    /**
     * 
     * @param {Array of Array} map 
     * @param {Array} objArray 
     */

  }, {
    key: "_setObjectsVisibilityArea",
    value: function _setObjectsVisibilityArea(map, objArray) {}
  }, {
    key: "_checkCollision",
    value: function _checkCollision(obj1, obj2) {
      return this._checkCollisionRectangles(obj1, obj2);
    }
  }, {
    key: "_checkCollisionRectangles",
    value: function _checkCollisionRectangles(obj1, obj2) {
      var x1 = obj1.xPos;
      var y1 = obj1.yPos;
      var xd1 = obj1.xPos + obj1.xSize;
      var yd1 = obj1.yPos + obj1.ySize;
      var x2 = obj2.xPos;
      var y2 = obj2.yPos;
      var xd2 = obj2.xPos + obj2.xSize;
      var yd2 = obj2.yPos + obj2.ySize;
      var left = Math.min(x1, x2);
      var right = Math.max(xd1, xd2);
      var top = Math.min(y1, y2);
      var bottom = Math.max(yd1, yd2);
      var width = right - left;
      var height = bottom - top;

      if (width <= obj1.xSize + obj2.xSize && height <= obj1.ySize + obj2.ySize) {
        return true;
      }

      return false;
    }
  }, {
    key: "_checkCollisionCirles",
    value: function _checkCollisionCirles(obj1, obj2) {}
  }, {
    key: "_checkCollisionRectangleCirle",
    value: function _checkCollisionRectangleCirle(rect, cirle) {}
  }]);

  return CollisionHandler;
}();



var increaseHpByTime =
/*#__PURE__*/
function () {
  function increaseHpByTime() {
    _classCallCheck(this, increaseHpByTime);

    this.start = Date.now();
  }

  _createClass(increaseHpByTime, [{
    key: "start",
    value: function start() {
      this.start = Date.now();
    }
  }, {
    key: "end",
    value: function end(person) {
      person.hp = person.hp + Math.trunc((Date.now() - this.start) / 100);

      if (person.hp > person.hpCapacity) {
        person.hp = person.hpCapacity;
      }
    }
  }]);

  return increaseHpByTime;
}();

/***/ }),

/***/ "./static/js/game/functions/myMath.js":
/*!********************************************!*\
  !*** ./static/js/game/functions/myMath.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyMath; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyMath =
/*#__PURE__*/
function () {
  function MyMath() {
    _classCallCheck(this, MyMath);
  }

  _createClass(MyMath, [{
    key: "getTeta",
    value: function getTeta(x, y, mouseX, mouseY) {
      var a = mouseX - x;
      var b = mouseY - y;
      var teta = 90 / 57.3 - Math.atan(a / b); // console.log(a,b);

      return teta;
    }
  }]);

  return MyMath;
}();



/***/ }),

/***/ "./static/js/game/game.js":
/*!********************************!*\
  !*** ./static/js/game/game.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _functions_Screen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Screen.js */ "./static/js/game/functions/Screen.js");
/* harmony import */ var _functions_collisionHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/collisionHandler.js */ "./static/js/game/functions/collisionHandler.js");
/* harmony import */ var _dynamic_Player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic/Player.js */ "./static/js/game/dynamic/Player.js");
/* harmony import */ var _static_Buff_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./static/Buff.js */ "./static/js/game/static/Buff.js");
/* harmony import */ var _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./static/Barrier.js */ "./static/js/game/static/Barrier.js");
/* harmony import */ var _functions_Handler_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions/Handler.js */ "./static/js/game/functions/Handler.js");
/* harmony import */ var _dynamic_bullet_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dynamic/bullet.js */ "./static/js/game/dynamic/bullet.js");
/* harmony import */ var _dynamic_Adv_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dynamic/Adv.js */ "./static/js/game/dynamic/Adv.js");
/* harmony import */ var _static_Shop_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./static/Shop.js */ "./static/js/game/static/Shop.js");
function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }











var Game =
/*#__PURE__*/
function () {
  function Game() {
    var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var router = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Game);

    this.router = router; // Родительский узел DOM 

    this._root = root;
    this._root.innerHTML = ''; // Игровой экран

    this._screen = new _functions_Screen_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.root); // Вспомогательные функции

    this.CollisionHandler = new _functions_collisionHandler_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.handler = new _functions_Handler_js__WEBPACK_IMPORTED_MODULE_5__["default"](this._screen._canvas); // Массив объектов

    this.eventsMap = {};
    this.objects = {}; // Генерация карты

    this.borderW = 20;
    this.sectionsCount = 10;
    this.prm;
    this.advsPos = {
      0: [this.borderW + 10, Math.floor(this._screen.height / 2), 25, 25],
      1: [Math.floor(this._screen.width / 2), this.borderW + 10, 25, 25],
      2: [Math.floor(this._screen.width / 2), this._screen.height - this.borderW - 35, 25, 25] // Выстрелы

    };
    this.lastFire = Date.now(); // Логика волн

    this.waveTrigger = true;
    this.wavePause = false;
    this.waveCount = 0;
    this.pauseTimer = 0;
    this.totalAdvSpawn = 0;
    this.currentAdvCount = 0; // Инициализация объектов

    this.objects['players'] = [];
    this.objects['buffers'] = [];
    this.objects['bullets'] = [];
    this.objects['barriers'] = [];
    this.objects['advs'] = [];
    this.objects['shops'] = [];
    this._player = new _dynamic_Player_js__WEBPACK_IMPORTED_MODULE_2__["default"](Math.floor(this._screen.width / 2), Math.floor(this._screen.height / 2), 20, 20, "none", 5);
    this._buff = new _static_Buff_js__WEBPACK_IMPORTED_MODULE_3__["default"](100, 10, 20, 20, "none");
    this.objects['players'].push(this._player);
    this.objects['buffers'].push(this._buff); // Игровые параметры

    this.score = 0;
    this.currentTime = 0;
  } // Спасвним соперников


  _createClass(Game, [{
    key: "_spawnAdvs",
    value: function _spawnAdvs(count) {
      for (var i = 0; i < count; i++) {
        var vel = 3 * Math.random();
        var pos = Math.floor(3 * Math.random());

        var adv = _construct(_dynamic_Adv_js__WEBPACK_IMPORTED_MODULE_7__["default"], _toConsumableArray(this.advsPos[pos]).concat(['none', vel]));

        this.objects['advs'].push(adv);
      }
    } // Строим границы

  }, {
    key: "_createBoards",
    value: function _createBoards() {
      var barrierTop = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, 0, this._screen.width, this.borderW);
      var barrierLeft = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, 0, this.borderW, this._screen.height);
      var barrierRight = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](this._screen.width - this.borderW, this.borderW, this._screen.width, this._screen.height);
      var barrierBottom = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.borderW, this._screen.height - this.borderW, this._screen.width - this.borderW, this._screen.height);
      this.objects['barriers'].push(barrierTop, barrierLeft, barrierRight, barrierBottom);
    } // Вычисляем параметры сетки

  }, {
    key: "_calculateParams",
    value: function _calculateParams() {
      // Ширина и высота каждой секции 
      var xStep = (this._screen.width - 2 * this.borderW) / this.sectionsCount;
      var yStep = (this._screen.height - 2 * this.borderW) / this.sectionsCount; // Ширина и высота каждого блока секции

      var xBlockSize = xStep / 2;
      var yBlockSize = yStep / 2; // Количество блоков 

      var blocksCount = this.sectionsCount * 2;
      var mapsParams = {
        'xStep': xStep,
        'yStep': yStep,
        'xBlockSize': xBlockSize,
        'yBlockSize': yBlockSize,
        'blocksCount': blocksCount
      };
      return mapsParams;
    } // Строим границы по сетке

  }, {
    key: "_spawnBarriers",
    value: function _spawnBarriers() {
      var that = this;

      for (var i = 1; i < this.sectionsCount - 1; i++) {
        for (var j = 1; j < this.sectionsCount - 1; j++) {
          if (!(i == Math.floor(this.sectionsCount / 2) && j == Math.floor(this.sectionsCount / 2))) {
            var xSection = this.borderW + j * that.prm['xStep'];
            var ySection = this.borderW + i * that.prm['yStep'];
            var barrierCout = Math.floor(Math.random() * 2);
            var idxs = [];

            for (var k = 0; k < barrierCout; k++) {
              var idx = void 0;
              var check = false;
              idx = Math.floor(Math.random() * 4);

              if (idxs.length != 0) {
                while (!check) {
                  idx = Math.floor(Math.random() * 4);
                  console.log('idx', idx);

                  for (var a = 0; a < idxs.length; a++) {
                    if (idxs[a] == idx) {
                      check = false;
                      break;
                    }

                    check = true;
                  }
                }
              }

              idxs.push(idx);
            }

            for (var p = 0; p < idxs.length; p++) {
              var barrier = void 0;

              switch (idxs[p]) {
                case 0:
                  {
                    barrier = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](xSection, ySection, that.prm['xBlockSize'], that.prm['yBlockSize']);
                    that.objects['barriers'].push(barrier);
                    break;
                  }

                case 1:
                  {
                    barrier = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](xSection + that.prm['xBlockSize'], ySection, that.prm['xBlockSize'], that.prm['yBlockSize']);
                    that.objects['barriers'].push(barrier);
                    break;
                  }

                case 2:
                  {
                    barrier = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](xSection, ySection + that.prm['yBlockSize'], that.prm['xBlockSize'], that.prm['yBlockSize']);
                    that.objects['barriers'].push(barrier);
                    break;
                  }

                case 3:
                  {
                    barrier = new _static_Barrier_js__WEBPACK_IMPORTED_MODULE_4__["default"](xSection + that.prm['xBlockSize'], ySection + that.prm['yBlockSize'], that.prm['xBlockSize'], that.prm['yBlockSize']);
                    that.objects['barriers'].push(barrier);
                    break;
                  }
              }
            }
          }
        }
      }

      console.log(this.objects['barriers']);
    } // Генерируем карту

  }, {
    key: "_generateMap",
    value: function _generateMap() {
      this._createBoards();

      this.prm = this._calculateParams();

      this._spawnBarriers();
    } // Вспомогательная сетка
    // _drawGrid() {
    //     const that = this;
    //     for (let i = 0; i < this.sectionsCount*4; i++) {
    //         for (let j = 0; j < this.sectionsCount*4; j++) { 
    //             that._screen.ctx.strokeStyle = 'red'; 
    //             that._screen.ctx.moveTo(this.borderW + j*this.prm['xBlockSize'], this.borderW + i*this.prm['yBlockSize']);
    //             that._screen.ctx.lineTo(this.borderW + j*this.prm['xBlockSize'], this._screen.height - this.borderW);
    //             that._screen.ctx.stroke();
    //         }
    //         that._screen.ctx.moveTo(this.borderW,this.borderW + i*this.prm['yBlockSize']);
    //         that._screen.ctx.lineTo(this._screen.width - this.borderW, this.borderW + i*this.prm['yBlockSize']);
    //         that._screen.ctx.stroke();
    //     }
    // }

  }, {
    key: "isEmpty",
    value: function isEmpty(obj) {
      for (var key in obj) {
        return false;
      }

      return true;
    }
  }, {
    key: "frame",
    value: function frame() {
      var _this = this;

      this.eventsMap = this.handler.sendEventMap();

      if (this.waveTrigger) {
        this.totalAdvSpawn += 5;
        this.currentAdvCount = this.totalAdvSpawn;
        this.waveCount++;
        console.log(this.totalAdvSpawn);

        this._spawnAdvs(this.totalAdvSpawn);
      }

      this.waveTrigger = false; // Стрельба

      if (this.eventsMap['mouseClick']) {
        if (Date.now() - this.lastFire > 100) {
          var bullet = new _dynamic_bullet_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.objects['players'][0].centerX, this.objects['players'][0].centerY, 2, 2, '', 7, this.eventsMap['mouseX'], this.eventsMap['mouseY']);
          this.objects['bullets'].push(bullet);
          this.lastFire = Date.now();
        }
      }

      this.objects['bullets'].forEach(function (element) {
        element.go();
      });
      this.objects['players'][0].logic(this.eventsMap, this.width, this.height);
      this.objects['advs'].forEach(function (adv) {
        adv.logic(_this.objects['players'][0].xPos, _this.objects['players'][0].yPos);
      });

      this._screen.render(this.objects);

      this.CollisionHandler.handleCollisions(this.objects, this.scoreObj);
      this.currentTime++;

      if (this.currentTime >= 60) {
        this.currentTime = 0;
        this.score++;
        this.objects['players'][0].hp -= 0.5;
      }

      if (this.objects['advs'].length == 0 && !this.wavePause) {
        this.objects['players'][0].hp = 100;
        this.currentTime = 0;
        this.pauseTimer = 30 * 60;
        this.wavePause = true;
        var shop = new _static_Shop_js__WEBPACK_IMPORTED_MODULE_8__["default"](this._screen.width - 120 - this.borderW, this._screen.height / 2, 100, 100);
        this.objects['shops'].push(shop);
      }

      if (this.wavePause) {
        this.currentTime = 0;
        this.pauseTimer -= 1;

        this._screen.showPauseTime(Math.floor(this.pauseTimer / 60));

        if (this.pauseTimer == 0) {
          this.objects['shops'].splice(0, 1);
          this.wavePause = false;
          this.waveTrigger = true;
        }
      }

      this._screen.showWaveNumber(this.waveCount);

      this._screen.showInfo(this.score, this.objects['players'][0].hp);

      this._checkDeath();

      requestAnimationFrame(function (time) {
        return _this.frame();
      });
    }
  }, {
    key: "_checkDeath",
    value: function _checkDeath() {
      if (this.objects.players[0].hp <= 0) {
        this.defeat();
      }
    } // Поражение

  }, {
    key: "defeat",
    value: function defeat() {
      this.router.go('/');
      throw new Error('Ok');
    } // Победа 

  }, {
    key: "victory",
    value: function victory() {
      this.router.go('/win');
    } // Инит метод : цикл -> отрисовка 

  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      this.canvas = this._screen.createCanvas();

      this._generateMap();

      requestAnimationFrame(function (time) {
        return _this2.frame();
      });
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./static/js/game/static/Barrier.js":
/*!******************************************!*\
  !*** ./static/js/game/static/Barrier.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Barrier; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import StaticEssence from './StaticEssence.js'
var Barrier =
/*#__PURE__*/
function () {
  function Barrier(xPos, yPos) {
    var xSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;
    var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 250;
    var URL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/default_texture";

    _classCallCheck(this, Barrier);

    // Координаты
    this.xPos = xPos;
    this.yPos = yPos;
    this.name = 'barrier'; // Позиция прицела - только у плеера
    // Его размеры 

    this.xSize = xSize; // vh

    this.ySize = ySize; // vh
  }

  _createClass(Barrier, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
      ctx.fillStyle = "gray";
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "logic",
    value: function logic() {}
  }, {
    key: "interact",
    value: function interact() {}
  }]);

  return Barrier;
}();



/***/ }),

/***/ "./static/js/game/static/Buff.js":
/*!***************************************!*\
  !*** ./static/js/game/static/Buff.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Buff; });
/* harmony import */ var _StaticEssence_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StaticEssence.js */ "./static/js/game/static/StaticEssence.js");
/* harmony import */ var _configs_buffConfigs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configs/buffConfigs.js */ "./static/js/game/configs/buffConfigs.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Buff =
/*#__PURE__*/
function (_StaticEssence) {
  _inherits(Buff, _StaticEssence);

  function Buff(buff) {
    var _this;

    _classCallCheck(this, Buff);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Buff).apply(this, arguments));
    _this.buff = _configs_buffConfigs_js__WEBPACK_IMPORTED_MODULE_1__["default"].increaseVelocity;
    _this.visited = false;
    return _this;
  }

  _createClass(Buff, [{
    key: "_render",
    value: function _render(canvasContext) {
      canvasContext.fillRect(this.xPos, this.yPos, this.xSize, this.ySize);
    }
  }, {
    key: "interact",
    value: function interact(person, buffObj) {
      if (!buffObj.visited) {
        console.log(buffObj.visited);
        person.addBuff(person, buffObj.buff);
        buffObj.visited = true;
      }
    }
  }]);

  return Buff;
}(_StaticEssence_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/game/static/Shop.js":
/*!***************************************!*\
  !*** ./static/js/game/static/Shop.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shop; });
/* harmony import */ var _StaticEssence_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StaticEssence.js */ "./static/js/game/static/StaticEssence.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Shop =
/*#__PURE__*/
function (_StaticEssence) {
  _inherits(Shop, _StaticEssence);

  function Shop() {
    var _this;

    _classCallCheck(this, Shop);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shop).apply(this, arguments));
    _this.playerInShop = false;
    _this.shopOpenStatus = false;
    _this.ctx;
    _this.root = document.body;
    return _this;
  }

  _createClass(Shop, [{
    key: "render",
    value: function render(ctx) {
      this.ctx = ctx;
      ctx.beginPath();
      ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
      ctx.fillStyle = "#C733FF";
      ctx.fill();
      ctx.closePath();

      if (this.playerInShop && !this.shopOpenStatus) {
        ctx.fillStyle = "#000";
        ctx.font = "italic 20pt Arial";
        ctx.fillText('Press E to Shop', 600, 300);
      }
    }
  }, {
    key: "logic",
    value: function logic() {}
  }, {
    key: "interact",
    value: function interact() {
      this.playerInShop = true;
    }
  }, {
    key: "open",
    value: function open() {
      if (this.playerInShop) {
        this.shopOpenStatus = true;
        this.ctx.fillStyle = 'E3E3E3';
        this.ctx.fillRect(250, 300, 650, 600);
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.shopOpenStatus = false;
      console.log('Shop closed');
    }
  }]);

  return Shop;
}(_StaticEssence_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/game/static/StaticEssence.js":
/*!************************************************!*\
  !*** ./static/js/game/static/StaticEssence.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticEssence; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StaticEssence =
/*#__PURE__*/
function () {
  function StaticEssence(xPos, yPos) {
    var xSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
    var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var URL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/default_texture";

    _classCallCheck(this, StaticEssence);

    // Основные параметры
    this.hpCapacity = 100; // у.е
    // this.velocity = velocity; // у.е
    // Координаты

    this.xPos = xPos;
    this.yPos = yPos; // Его размеры 

    this.xSize = xSize; // vh

    this.ySize = ySize; // vh

    this.texture = URL; // URL 

    this.immortal = true; // для рекламы
  }

  _createClass(StaticEssence, [{
    key: "_render",
    value: function _render() {}
  }, {
    key: "interact",
    value: function interact() {}
  }]);

  return StaticEssence;
}();



/***/ }),

/***/ "./static/js/game/static/escape.js":
/*!*****************************************!*\
  !*** ./static/js/game/static/escape.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Escape; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Escape = function Escape() {
  var xPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 700;
  var yPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var xSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

  _classCallCheck(this, Escape);

  this.xPos = xPos;
  this.yPos = yPos;
  this.xSize = xSize;
  this.ySize = ySize;
};



/***/ }),

/***/ "./static/js/modules/NetworkHandler.js":
/*!*********************************************!*\
  !*** ./static/js/modules/NetworkHandler.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NetworkHandler; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable import/prefer-default-export */

/**
 * Прототип класса с модулем проверки авторизации пользователя.
 */
var noop = function noop() {
  return null;
};
/**
 * Класс с методами отправки AJAX-запросов на сервер
 */


var NetworkHandler =
/*#__PURE__*/
function () {
  function NetworkHandler() {
    _classCallCheck(this, NetworkHandler);
  }

  _createClass(NetworkHandler, [{
    key: "_send",
    value: function _send() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$callback = _ref.callback,
          callback = _ref$callback === void 0 ? noop : _ref$callback,
          _ref$path = _ref.path,
          path = _ref$path === void 0 ? '/' : _ref$path,
          _ref$method = _ref.method,
          method = _ref$method === void 0 ? 'GET' : _ref$method,
          body = _ref.body;

      var options = {
        method: method,
        // Настройка CORS
        headers: {
          // Запрещаем открытие iframe на сайте
          'X-Frame-Options': 'DENY',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // // Мы разворачиваемся на этом домене
          // 'Access-Control-Allow-Origin' : 'http://advhater.ru/',
          'Access-Control-Allow-Credentials': true,
          // Допускаем только GET, POST, DELETE, HEAD запросы
          'Access-Control-Request-Method': 'POST, GET, PUT, DELETE, HEAD,' // Для "непростых запросов"
          // 'Origin' : '',

        },
        // credentials: "same-origin",
        credentials: "include",
        // mode : 'cors',
        cache: 'default',
        body: body
      };
      fetch(path, options).then(function (response) {
        console.log(path, response);
        console.log('headers', response.headers);

        if (response.status === 200) {
          console.log('network 200 success', response);
          return response.json();
        } else if (response.status === 201) {
          console.log('network 201 success', response);
          console.log(response.headers.get('Set-Cookie'));
          console.log(JSON.stringify(response.headers)); // document.cookie = response.headers['Set-Cookie'];

          return 201;
        } else if (response === undefined) {
          return 404; // throw new Error('Wrong network response');
        }

        return response.status;
      }).then(function (data) {
        callback(data);
      })["catch"](function (error) {
        callback();
      });
    }
  }, {
    key: "doGet",
    value: function doGet() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$callback = _ref2.callback,
          callback = _ref2$callback === void 0 ? noop : _ref2$callback,
          _ref2$path = _ref2.path,
          path = _ref2$path === void 0 ? '/' : _ref2$path;

      this._send({
        callback: callback,
        path: path,
        method: 'GET'
      });
    }
  }, {
    key: "doHead",
    value: function doHead() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$callback = _ref3.callback,
          callback = _ref3$callback === void 0 ? noop : _ref3$callback,
          _ref3$path = _ref3.path,
          path = _ref3$path === void 0 ? '/' : _ref3$path;

      this._send({
        callback: callback,
        path: path,
        method: 'HEAD'
      });
    }
  }, {
    key: "doPost",
    value: function doPost() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$callback = _ref4.callback,
          callback = _ref4$callback === void 0 ? noop : _ref4$callback,
          _ref4$path = _ref4.path,
          path = _ref4$path === void 0 ? '/' : _ref4$path,
          _ref4$body = _ref4.body,
          body = _ref4$body === void 0 ? {} : _ref4$body;

      this._send({
        callback: callback,
        path: path,
        method: 'POST',
        body: body
      });
    }
  }, {
    key: "doPut",
    value: function doPut() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref5$callback = _ref5.callback,
          callback = _ref5$callback === void 0 ? noop : _ref5$callback,
          _ref5$path = _ref5.path,
          path = _ref5$path === void 0 ? '/' : _ref5$path,
          _ref5$body = _ref5.body,
          body = _ref5$body === void 0 ? {} : _ref5$body;

      this._send({
        callback: callback,
        path: path,
        method: 'PUT',
        body: body
      });
    }
  }, {
    key: "doDelete",
    value: function doDelete() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$callback = _ref6.callback,
          callback = _ref6$callback === void 0 ? noop : _ref6$callback,
          _ref6$path = _ref6.path,
          path = _ref6$path === void 0 ? '/' : _ref6$path,
          _ref6$body = _ref6.body,
          body = _ref6$body === void 0 ? {} : _ref6$body;

      this._send({
        callback: callback,
        path: path,
        method: 'DELETE',
        body: body
      });
    }
  }]);

  return NetworkHandler;
}();


window.NetworkHandler = new NetworkHandler();

/***/ }),

/***/ "./static/js/modules/Router.js":
/*!*************************************!*\
  !*** ./static/js/modules/Router.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
/* harmony import */ var _ws_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ws.js */ "./static/js/modules/ws.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Router =
/*#__PURE__*/
function () {
  /**
   * Конструктор роутера.
   * @param {HTMLelement} app 
   * @param {Map} routes - мапа {'string': Object}, Object - вьюха
   */
  function Router() {
    var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    _classCallCheck(this, Router);

    this.app = app;
    this.routes = {};
    this.ws = new _ws_js__WEBPACK_IMPORTED_MODULE_0__["default"](document.body);
  }

  _createClass(Router, [{
    key: "run",
    value: function run() {
      var _this = this;

      this.go(window.location.pathname); // this.go('/leaderboard?offset=3');

      this.app.addEventListener('click', function (event) {
        event.preventDefault();

        _this.go(event.target.getAttribute('href'));
      }); // Обрабатывает события при клике назад/вперед

      window.addEventListener('popstate', function () {
        _this.go(window.location.pathname);
      });
    }
    /**
     * Функция добавления нового маршрута.
     * @param {string} path 
     * @param {Object} _renderObject - Вьюшка
     */

  }, {
    key: "add",
    value: function add(path, _renderObject) {
      var renderObject = new _renderObject(this.app, this);
      this.routes[path] = renderObject;
    }
    /**
     * Функция перехода по пути path
     * @param {string} path 
     */

  }, {
    key: "go",
    value: function go(path) {
      var urlData = this._parseUrl(path);

      console.log(urlData);
      path = urlData.pathname;
      /*
          Если тебе нужны собвственные addEventListener-ы,
          то вместо того, чтобы создавать новые, ты можешь
          добававить маршрут во вьюхе в this.specialRoutes={}.
          Здесь (ниже) будет вызываться функция, соответсвующая этому маршруту.
          Идея заключалась в том, чтобы не создавать лишних eventListener-ов.
          А можешь забить и создать собвственный eventListener во вьюхе))
      */

      if (typeof this.currentRoute !== 'undefined') {
        if (typeof this.currentRoute.specialRoutes[path] !== 'undefined') {
          this.currentRoute.specialRoutes[path](this.currentRoute);
          return;
        }
      }

      var route = this.routes[path];

      if (!route) {
        return;
      }

      if (window.location.pathname !== urlData.href) {
        window.history.pushState(null, '', urlData.href);
      }
      /**
       * Сохраняю маршрут, который должен будет показаться на экран.
       * Используется пока только в функции go(path);
       */


      this.currentRoute = route;
      route.show(urlData);
    }
  }, {
    key: "_parseUrl",
    value: function _parseUrl(url) {
      url = url || this.href;
      var pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
      var rx = new RegExp(pattern);
      var parts = rx.exec(url);
      return {
        href: parts[0] || "",
        protocol: parts[1] || "",
        host: parts[4] || "",
        hostname: parts[5] || "",
        port: parts[6] || "",
        pathname: parts[7] || "/",
        search: parts[8] || "",
        hash: parts[10] || ""
      };
    }
  }]);

  return Router;
}();



/***/ }),

/***/ "./static/js/modules/Validation.js":
/*!*****************************************!*\
  !*** ./static/js/modules/Validation.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Validation; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-param-reassign */

/* eslint-disable no-mixed-spaces-and-tabs */

/* eslint-disable no-useless-constructor */

/* eslint-disable class-methods-use-this */
var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, [{
    key: "checkPassword",
    value: function checkPassword() {
      var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // const error = document.getElementById('password-validation-error');
      // input.className = 'login_input login_input_error';
      if (typeof password !== 'string') {
        return 'Wrong password type';
      }

      if (password.length < 3 || password.length > 30) {
        return 'Use 3-30 characters for your password.';
      }

      if (!/^[a-zA-Z0-9!?.,_-]+$/.test(password)) {
        return 'Use only letters, numbers and punctuation characters.';
      } // error.textContent = '';
      // input.className = 'login_input';


      return 'OK';
    }
  }, {
    key: "checkNickname",
    value: function checkNickname() {
      var nickname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (typeof nickname !== 'string') {
        return 'Wrong password type';
      }

      if (nickname.length < 1) {
        return 'Nickname is too short';
      }

      if (nickname.length > 30) {
        return 'Nickname is too big';
      }

      if (!/^[a-zA-Z0-9!?.,_-]+$/.test(nickname)) {
        return 'Use only letters, numbers and punctuation characters.';
      }

      if (!/^[a-zA-Z]+$/.test(nickname[0])) {
        return 'Nickname shoud start from letter';
      }

      return 'OK';
    }
  }, {
    key: "checkEmail",
    value: function checkEmail() {
      var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!/^[0-9a-zA-Z-.]+@[0-9a-zA-Z-]{1,}\.[a-zA-Z]{1,}$/.test(email)) {
        return 'Invalid email';
      }

      return 'OK';
    }
  }]);

  return Validation;
}();



/***/ }),

/***/ "./static/js/modules/ws.js":
/*!*********************************!*\
  !*** ./static/js/modules/ws.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ws; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// // const ws = new WebSocket('https://advhater.ru/ws');
// ws.onopen = () => {
//     console.log('ws success connect');
//     const chatbox = document.querySelector('.chat__chatbox');
//     ws.onmessage = (evt) => {
//         // console.log('ws message:', message);
//         const messageBox = document.createElement("div");
//         messageBox.className = 'chat__chatbox-message'
//         messageBox.innerText = evt.data + '\n';
//         console.log(evt, evt.data);
//         chatbox.appendChild(messageBox);   
//     }
// }
var Ws =
/*#__PURE__*/
function () {
  function Ws(chatbox) {
    var _this = this;

    var wsUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'advhater.ru';

    _classCallCheck(this, Ws);

    this.chatbox = chatbox;
    this.ws = new WebSocket('wss://' + wsUrl + '/ws');

    this.ws.onmessage = function (evt) {
      var messageBox = document.createElement("div");
      messageBox.className = 'chat__chatbox-message';
      var message = JSON.parse(evt.data);
      var messageAvatar = document.createElement('img');
      messageAvatar.className = 'chat__chatbox-message-avatar';
      messageAvatar.src = message.Url;
      var messageNickname = document.createElement('div');
      messageNickname.className = 'chat__chatbox-message-nickname';
      messageNickname.innerText = message.Nickname;
      var messageText = document.createElement('div');
      messageText.className = 'chat__chatbox-message-text';
      messageText.innerText = message.Body;
      var messageTimestamp = document.createElement('div');
      messageTimestamp.className = 'chat__chatbox-message-timestamp';
      messageTimestamp.innerText = message.Timestamp;
      messageBox.appendChild(messageAvatar);
      messageBox.appendChild(messageNickname);
      messageBox.appendChild(messageText);
      messageBox.appendChild(messageTimestamp);

      _this.chatbox.appendChild(messageBox);
    };
  }

  _createClass(Ws, [{
    key: "setChatbox",
    value: function setChatbox(cb) {
      this.chatbox = cb;
    }
  }, {
    key: "send",
    value: function send(data) {
      this.ws.send(data);
    }
  }]);

  return Ws;
}(); // export default ws;




/***/ }),

/***/ "./static/js/views/GameView.js":
/*!*************************************!*\
  !*** ./static/js/views/GameView.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _game_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/game.js */ "./static/js/game/game.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var GameView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(GameView, _BaseView);

  function GameView() {
    var _this;

    _classCallCheck(this, GameView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameView).apply(this, arguments));
    _this.Game = new _game_game_js__WEBPACK_IMPORTED_MODULE_1__["default"](document.body, _this.router); // this.initSpecialRoutes();

    return _this;
  }

  _createClass(GameView, [{
    key: "show",
    value: function show() {
      this.Game.run();
    }
  }]);

  return GameView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/LeaderboardView.js":
/*!********************************************!*\
  !*** ./static/js/views/LeaderboardView.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LeaderboardView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _components_LeaderboardComponent_LeaderboardComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/LeaderboardComponent/LeaderboardComponent.js */ "./static/js/components/LeaderboardComponent/LeaderboardComponent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var _window = window,
    NetworkHandler = _window.NetworkHandler;
/**
 * Класс с отрисовкой формы логина.
 */

var LeaderboardView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(LeaderboardView, _BaseView);

  function LeaderboardView() {
    var _this;

    _classCallCheck(this, LeaderboardView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LeaderboardView).apply(this, arguments));
    _this.LeaderboardComponent = new _components_LeaderboardComponent_LeaderboardComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

    _this.initSpecialRoutes();

    return _this;
  }

  _createClass(LeaderboardView, [{
    key: "show",
    value: function show(urlData) {
      var that = this;
      var offset = 1;

      if (urlData.search !== '') {
        offset = this._getURLParams(urlData.search)['offset'];
      }

      offset = parseInt(offset);
      console.log("OFFFFFSET: ", offset);
      NetworkHandler.doGet({
        callback: function callback(data) {
          that.LeaderboardComponent._usersArr = data;
          that.LeaderboardComponent.render(offset);
        },
        path: '/api/leaderboard?offset=' + offset
      });
    }
  }, {
    key: "_getURLParams",
    value: function _getURLParams(url) {
      var urlParams = {};
      url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
        urlParams[$1] = $3;
      });
      return urlParams;
    }
  }, {
    key: "initSpecialRoutes",
    value: function initSpecialRoutes() {}
  }]);

  return LeaderboardView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/LoginView.js":
/*!**************************************!*\
  !*** ./static/js/views/LoginView.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _components_LoginComponent_LoginComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/LoginComponent/LoginComponent.js */ "./static/js/components/LoginComponent/LoginComponent.js");
/* harmony import */ var _modules_Validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/Validation.js */ "./static/js/modules/Validation.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var _window = window,
    NetworkHandler = _window.NetworkHandler;
/**
 * Класс с отрисовкой формы логина.
 */

var LoginView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(LoginView, _BaseView);

  function LoginView() {
    var _this;

    _classCallCheck(this, LoginView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginView).apply(this, arguments));
    _this.Validation = new _modules_Validation_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    _this.LoginComponent = new _components_LoginComponent_LoginComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

    _this.initSpecialRoutes();

    return _this;
  }

  _createClass(LoginView, [{
    key: "show",
    value: function show() {
      var that = this;
      NetworkHandler.doGet({
        // eslint-disable-next-line no-unused-vars
        callback: function callback(data) {
          var isAuth = data['is_auth'];
          that.root.innerHTML = that.LoginComponent.render(isAuth);
          that.LoginComponent.setOnChangeListener(that.LoginComponent.login);
          that.LoginComponent.setOnChangeListener(that.LoginComponent.password);
        },
        path: '/api/isauth'
      });
    }
    /**
     * Функция инициализирует "специальные" роутеры. Подробнее в файле View.js
     * или Router.js : go(path)
     */

  }, {
    key: "initSpecialRoutes",
    value: function initSpecialRoutes() {
      this.specialRoutes['/authorizeuser'] = this.authorizeUser;
    }
    /**
     * Функция вызывается Роутером при нажатии на <a href=/authori...></a>
     * @param {Object} that - ссылка на инстанс LoginView
     */

  }, {
    key: "authorizeUser",
    value: function authorizeUser(that) {
      var login = that.LoginComponent.login;
      var password = that.LoginComponent.password;
      var isValid = that.validateValue(login, that.Validation.checkNickname, that.LoginComponent);

      if (!isValid) {
        return;
      }

      isValid = that.validateValue(password, that.Validation.checkPassword, that.LoginComponent);

      if (!isValid) {
        return;
      }

      var payload = {
        nickname: login.value,
        password: password.value
      };
      NetworkHandler.doPost({
        callback: function callback(data) {
          console.log('data in login', data);

          if (data === 201) {
            console.log('doc cookie: ', document.cookie); // console.log('data in login:', data);
            // that.router.handle('profile', data);

            that.router.go('/');
          } else if (data === 404) {
            that.LoginComponent.setErrorText("Wrong login or password");
          }
        },
        path: '/api/login',
        body: JSON.stringify(payload)
      });
    }
    /**
     * Функциия, проверяющая на валидность поле input.
     * Если поле не валидное, то вызывает метод errorField, которое подсвечивает поле.
     * Если все ок - убирает подсветку.
     * @param {HTMLelement} input
     * @param {function} validationFunc 
     * @param {Object} LoginComponent 
     */

  }, {
    key: "validateValue",
    value: function validateValue(input, validationFunc, LoginComponent) {
      var validationMessage = validationFunc(input.value);

      if (validationMessage.localeCompare('OK') !== 0) {
        LoginComponent.setErrorText(validationMessage);
        LoginComponent.errorField(input);
        return false;
      }

      LoginComponent.goodField(input);
      return true;
    }
  }]);

  return LoginView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/LogoutView.js":
/*!***************************************!*\
  !*** ./static/js/views/LogoutView.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogoutView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var _window = window,
    NetworkHandler = _window.NetworkHandler;
/**
 * Класс с отрисовкой формы логина.
 */

var LogoutView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(LogoutView, _BaseView);

  function LogoutView() {
    _classCallCheck(this, LogoutView);

    return _possibleConstructorReturn(this, _getPrototypeOf(LogoutView).apply(this, arguments));
  }

  _createClass(LogoutView, [{
    key: "show",
    value: function show() {
      var that = this;
      NetworkHandler.doDelete({
        // eslint-disable-next-line no-unused-vars
        callback: function callback() {
          that.router.go('/');
        },
        path: '/api/logout'
      });
    }
  }]);

  return LogoutView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/MenuView.js":
/*!*************************************!*\
  !*** ./static/js/views/MenuView.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _components_MenuComponent_MenuComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/MenuComponent/MenuComponent.js */ "./static/js/components/MenuComponent/MenuComponent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var _window = window,
    NetworkHandler = _window.NetworkHandler;

var MenuView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(MenuView, _BaseView);

  function MenuView() {
    var _this;

    _classCallCheck(this, MenuView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuView).apply(this, arguments));
    _this.MenuComponent = new _components_MenuComponent_MenuComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return _this;
  }

  _createClass(MenuView, [{
    key: "show",
    value: function show() {
      var that = this;
      NetworkHandler.doGet({
        // eslint-disable-next-line no-unused-vars
        callback: function callback(data) {
          console.log('menu view', data);

          if (_typeof(data) == 'object') {
            var showButtons = function showButtons(e) {
              // console.log('on');
              console.log();
              buttonsSection.style.display = 'flex';
            };

            var hideButtons = function hideButtons(e) {
              buttonsSection.style.display = 'none';
            };

            that.root.innerHTML = that.MenuComponent.render(data);
            var profileSection = document.querySelector('.menu__profile');
            var buttonsSection = document.getElementById('menu__profile-buttons-section');
            profileSection.addEventListener('mouseover', showButtons, false);
            profileSection.addEventListener('mouseout', hideButtons, false);
          } else {
            that.root.innerHTML = that.MenuComponent.render(false);
          }
        },
        path: '/api/isauth'
      });
    }
  }]);

  return MenuView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/PaymentsView.js":
/*!*****************************************!*\
  !*** ./static/js/views/PaymentsView.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PaymentsView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _components_PaymentsComponent_PaymentsComponents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PaymentsComponent/PaymentsComponents.js */ "./static/js/components/PaymentsComponent/PaymentsComponents.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var _window = window,
    NetworkHandler = _window.NetworkHandler;

var PaymentsView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(PaymentsView, _BaseView);

  function PaymentsView() {
    var _this;

    _classCallCheck(this, PaymentsView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PaymentsView).apply(this, arguments));
    _this.PaymentsComponent = new _components_PaymentsComponent_PaymentsComponents_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return _this;
  }

  _createClass(PaymentsView, [{
    key: "show",
    value: function show() {
      var that = this;
      NetworkHandler.doGet({
        callback: function callback(data) {
          console.log('data', data);

          if (_typeof(data) === 'object') {
            console.log("IM IN", data.status);
            that.root.innerHTML = that.PaymentsComponent.render(true);
          } else {
            that.root.innerHTML = that.PaymentsComponent.render(true);
          }

          that.initSpecialRoutes();
        },
        path: '/api/isauth'
      });
    }
  }, {
    key: "initSpecialRoutes",
    value: function initSpecialRoutes() {
      this.specialRoutes['/payout'] = this.send;
    }
  }, {
    key: "send",
    value: function send() {
      var form = document.querySelector('.payments__input-section');
      var payload = {
        phone: form.phone.value,
        amount: form.amount.value
      };
      NetworkHandler.doPost({
        callback: function callback(data) {
          console.log('Success:', data);

          if (data === 201) {
            that.router.go('/');
          }
        },
        path: '/api/payments',
        body: JSON.stringify(payload)
      });
    }
  }]);

  return PaymentsView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/ShopView.js":
/*!*************************************!*\
  !*** ./static/js/views/ShopView.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShopView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _components_ShopComponent_ShopComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ShopComponent/ShopComponent.js */ "./static/js/components/ShopComponent/ShopComponent.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // const { NetworkHandler } = window;

var ShopView =
/*#__PURE__*/
function () {
  function ShopView(root, weapons) {
    var _this = this;

    _classCallCheck(this, ShopView);

    this.root = root;
    this.weapons = weapons;
    this.ShopComponent = new _components_ShopComponent_ShopComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.root, this.weapons);
    document.addEventListener('click', function (event) {
      if (event.target.className === 'shop__menu-item' || event.target.parentElement.className === 'shop__menu-item') {
        if (event.target.dataset.section === undefined) {
          _this.weapon(event.target.parentElement.dataset.section);
        } else {
          _this.weapon(event.target.dataset.section);
        }
      }
    });
  }

  _createClass(ShopView, [{
    key: "show",
    value: function show() {
      this.ShopComponent.render();
    }
  }, {
    key: "weapon",
    value: function weapon(_weapon) {
      this.ShopComponent.renderWeaponInfo(_weapon);
    }
  }, {
    key: "setWeapon",
    value: function setWeapon(weaponId) {
      return weaponId;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.root.innerHTML = '';
    }
  }]);

  return ShopView;
}();



/***/ }),

/***/ "./static/js/views/SignupView.js":
/*!***************************************!*\
  !*** ./static/js/views/SignupView.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SignupView; });
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ "./static/js/views/View.js");
/* harmony import */ var _components_SignupComponent_SignupComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SignupComponent/SignupComponent.js */ "./static/js/components/SignupComponent/SignupComponent.js");
/* harmony import */ var _modules_Validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/Validation.js */ "./static/js/modules/Validation.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var _window = window,
    NetworkHandler = _window.NetworkHandler;

var SignupView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(SignupView, _BaseView);

  function SignupView() {
    var _this;

    _classCallCheck(this, SignupView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SignupView).apply(this, arguments));
    _this.Validation = new _modules_Validation_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    _this.SignupComponent = new _components_SignupComponent_SignupComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return _this;
  }

  _createClass(SignupView, [{
    key: "show",
    value: function show() {
      var that = this;
      NetworkHandler.doGet({
        // eslint-disable-next-line no-unused-vars
        callback: function callback(data) {
          console.log('data on show signup', data);
          var isAuth;

          if (data.status === 200) {
            isAuth = true;
          } else {
            isAuth = false;
          } // let isAuth = data['is_auth'];


          that.root.innerHTML = that.SignupComponent.render(isAuth);
          that.initSpecialRoutes();
          var form = document.querySelector('#signup-form');
          that.SignupComponent.setOnChangeListener(form.nickname);
          that.SignupComponent.setOnChangeListener(form.email);
          that.SignupComponent.setOnChangeListener(form.password);
          that.SignupComponent.setOnChangeListener(form.password_repeat);
        },
        path: '/api/isauth'
      });
    }
  }, {
    key: "initSpecialRoutes",
    value: function initSpecialRoutes() {
      this.specialRoutes['/signupuser'] = this.signupUser;
    }
  }, {
    key: "signupUser",
    value: function signupUser(that) {
      console.log('in SpecialRoute');
      var form = document.querySelector('#signup-form');
      var isValid = that.validateValue(form.nickname, that.Validation.checkNickname, that.SignupComponent);

      if (!isValid) {
        return;
      }

      isValid = that.validateValue(form.email, that.Validation.checkEmail, that.SignupComponent);

      if (!isValid) {
        return;
      }

      isValid = that.validateValue(form.password, that.Validation.checkPassword, that.SignupComponent);

      if (!isValid) {
        return;
      }

      if (form.password.value !== form.password_repeat.value) {
        that.SignupComponent.setErrorText('Passwords do not match');
        return;
      }

      var payload = {
        nickname: form.nickname.value,
        email: form.email.value,
        password: form.password.value
      };
      console.log(payload);
      NetworkHandler.doPost({
        callback: function callback(data) {
          console.log('Success:', data);

          if (data === 201) {
            that.router.go('/');
          } else if (data === 409) {
            that.SignupComponent.setErrorText("This email/nickname is already registered");
          }
        },
        path: '/api/signup',
        body: JSON.stringify(payload)
      });
    }
    /**
     * Функциия, проверяющая на валидность поле input.
     * Если поле не валидное, то вызывает метод errorField, которое подсвечивает поле.
     * Если все ок - убирает подсветку.
     * @param {HTMLelement} input
     * @param {function} validationFunc 
     * @param {Object} SignupComponent 
     */

  }, {
    key: "validateValue",
    value: function validateValue(input, validationFunc, SignupComponent) {
      var validationMessage = validationFunc(input.value);

      if (validationMessage.localeCompare('OK') !== 0) {
        SignupComponent.setErrorText(validationMessage);
        SignupComponent.errorField(input);
        return false;
      }

      SignupComponent.goodField(input);
      return true;
    }
  }]);

  return SignupView;
}(_View_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./static/js/views/View.js":
/*!*********************************!*\
  !*** ./static/js/views/View.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseView; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseView =
/*#__PURE__*/
function () {
  /**
   * Конструктор
   * @param {HTMLelement} root - экран, где будет весь экш.
   * @param {Object} router - ссылка на инстанс роутера.
   */
  function BaseView() {
    var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var router = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;

    _classCallCheck(this, BaseView);

    this.root = root;
    this.router = router;
    /**
     * Мапа специальных роутеров: Map {'string': 'function'}
     * Используется, например, в LoginView для маршрута /authorizeuser,
     * При нашатии на <a href="/autho...></a> роутер не переходит по ссылке,
     * а вызывает метод из Map {'string': 'function'}.
     */

    this.specialRoutes = {};
  }
  /**
   * метод, который будет печатать что-нибудь экран.
   */


  _createClass(BaseView, [{
    key: "show",
    value: function show() {
      this.root.innerHTML = '';
    }
  }]);

  return BaseView;
}();



/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi ./static/index.js ./static/index.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./static/index.js */"./static/index.js");
module.exports = __webpack_require__(/*! ./static/index.scss */"./static/index.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map