var Plotit =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _adjuster = __webpack_require__(/*! ./core/adjuster */ 1);
	
	var _adjuster2 = _interopRequireDefault(_adjuster);
	
	var _filter = __webpack_require__(/*! ./core/filter */ 2);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _resize = __webpack_require__(/*! ./core/resize */ 4);
	
	var _resize2 = _interopRequireDefault(_resize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Plotit = function () {
	  function Plotit(props) {
	    _classCallCheck(this, Plotit);
	
	    var selector = props.selector || 'body';
	    this.$panel = document.querySelector(selector);
	  }
	
	  _createClass(Plotit, [{
	    key: 'renderImage',
	    value: function renderImage(imgSrc) {
	      var _this = this;
	
	      if (this.$panel) {
	        (function () {
	          var $panel = _this.$panel,
	              panelW = $panel.clientWidth,
	              panelH = $panel.clientHeight;
	
	          var $canvas = document.createElement('canvas'),
	              context = $canvas.getContext('2d');
	
	          image = new Image();
	          image.crossOrigin = 'anonymous';
	          image.src = imgSrc;
	          _this.image = image;
	
	          image.onload = function () {
	            var imageW = image.width,
	                imageH = image.height,
	                scale = void 0;
	
	            context.clearRect(0, 0, $canvas.width, $canvas.height);
	
	            if (imageW > imageH) {
	              scale = imageW / panelW;
	            } else {
	              scale = imageH / panelH;
	            }
	
	            imageW = imageW / scale;
	            imageH = imageH / scale;
	
	            var dx = (panelW - imageW) / 2,
	                dy = (panelH - imageH) / 2;
	
	            $canvas.id = 'plotitCanvas';
	            $canvas.width = imageW;
	            $canvas.height = imageH;
	            $canvas.style.position = 'absolute';
	            $canvas.style.top = dy + 'px';
	            $canvas.style.left = dx + 'px';
	
	            context.drawImage(image, 0, 0, $canvas.width, $canvas.height);
	
	            $panel.innerHTML = '';
	            $panel.appendChild($canvas);
	
	            _this.$canvas = $canvas;
	            _this.context = context;
	            _this.originData = _this.getData();
	          };
	        })();
	      }
	    }
	  }, {
	    key: 'getData',
	    value: function getData(canvas) {
	      canvas = canvas || this.$canvas;
	      var context = canvas.getContext('2d') || this.context;
	      if (context) {
	        return context.getImageData(0, 0, canvas.width, canvas.height);
	      }
	    }
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      var context = this.context || this.$canvas.getContext('2d');
	      if (context) {
	        this.clearData();
	        return context.putImageData(data, 0, 0);
	      }
	    }
	  }, {
	    key: 'clearData',
	    value: function clearData() {
	      var context = this.context || this.$canvas.getContext('2d');
	      if (context) {
	        return context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
	      }
	    }
	  }, {
	    key: 'resetImage',
	    value: function resetImage() {
	      if (this.originData) {
	        this.setData(this.originData);
	      }
	    }
	  }, {
	    key: 'processFilter',
	    value: function processFilter(processor, canvas) {
	
	      // new layer
	      _filter2.default.newLayer(canvas);
	      // bind Util
	      _filter2.default.bindUtil(this);
	
	      if (processor && typeof processor === 'string') {
	        processor = _filter2.default[processor].bind(_filter2.default);
	      }
	
	      // filter processing
	      if (processor && typeof processor === 'function') {
	        processor();
	        // filter render
	        _filter2.default.renderLayer();
	      }
	    }
	  }, {
	    key: 'processPixel',
	    value: function processPixel(processor, degree) {
	      if (this.getData()) {
	        var imageData = imageData || this.getData(),
	            deg = +degree || 0,
	            pixel = void 0;
	
	        if (processor && typeof processor === 'string') {
	          processor = _adjuster2.default[processor];
	          processor = processor ? processor.bind(_adjuster2.default) : null;
	        }
	
	        if (processor && typeof processor === 'function') {
	          for (var i = 0; i < imageData.data.length; i += 4) {
	            var _pixel = {
	              r: imageData.data[i + 0],
	              g: imageData.data[i + 1],
	              b: imageData.data[i + 2],
	              a: imageData.data[i + 3]
	            };
	
	            _pixel = processor(_pixel, deg);
	
	            imageData.data[i + 0] = _pixel.r;
	            imageData.data[i + 1] = _pixel.g;
	            imageData.data[i + 2] = _pixel.b;
	            imageData.data[i + 3] = _pixel.a;
	          }
	        }
	
	        this.setData(imageData);
	      }
	    }
	  }, {
	    key: 'processCrop',
	    value: function processCrop(opts) {
	      _resize2.default.cropImage(this.$canvas, opts);
	    }
	  }, {
	    key: 'processResize',
	    value: function processResize(originCanvas, scale, previewCanvas) {
	      // new layer
	      _resize2.default.newFrame(originCanvas, scale);
	      // bind Util
	      _resize2.default.bindUtil(this);
	      // set Preview
	      _resize2.default.setPreview(previewCanvas);
	      // bind mousemove
	      _resize2.default.bindFrame(scale);
	    }
	  }, {
	    key: 'getResizeFrame',
	    value: function getResizeFrame() {
	      return _resize2.default.getFrame();
	    }
	  }, {
	    key: 'removeResizeFrame',
	    value: function removeResizeFrame() {
	      _resize2.default.removeFrame();
	    }
	  }, {
	    key: 'convertToBase64',
	    value: function convertToBase64(size) {
	      var quality = 1,
	          maxSize = 10000000,
	          base64Str = '';
	
	      if (size > maxSize) {
	        quality = Math.floor(maxSize / size);
	      }
	
	      var imageData = this.getData();
	
	      this.setData(imageData);
	
	      base64Str = this.$canvas.toDataURL(null, quality);
	
	      return base64Str.substring(base64Str.indexOf(',') + 1);
	    }
	  }]);
	
	  return Plotit;
	}();
	
	exports.default = Plotit;

/***/ },
/* 1 */
/*!******************************!*\
  !*** ./src/core/adjuster.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlotitAdjuster = function () {
	  function PlotitAdjuster() {
	    _classCallCheck(this, PlotitAdjuster);
	
	    this.defaultDegree = 0;
	    this.options = ['r', 'g', 'b'];
	  }
	
	  _createClass(PlotitAdjuster, [{
	    key: 'checkOpts',
	    value: function checkOpts(pixel) {
	      var keys = Object.keys(pixel);
	      return this.options.every(function (item) {
	        return keys.indexOf(item) !== -1;
	      });
	    }
	
	    // 亮度
	
	  }, {
	    key: 'brightness',
	    value: function brightness(pixel, degree) {
	      var deg = parseInt(degree || this.defaultDegree, 10);
	
	      deg = Math.floor(255 * (deg / 250));
	
	      if (this.checkOpts(pixel)) {
	        pixel.r += deg;
	        pixel.g += deg;
	        pixel.b += deg;
	      }
	
	      return pixel;
	    }
	
	    // 饱和度
	
	  }, {
	    key: 'saturation',
	    value: function saturation(pixel, degree) {
	      var deg = parseInt(degree || this.defaultDegree, 10);
	
	      if (this.checkOpts(pixel)) {
	        var max = Math.max(pixel.r, pixel.g, pixel.b);
	
	        pixel.r += pixel.r !== max ? (max - pixel.r) * (deg / 50) : 0;
	        pixel.g += pixel.g !== max ? (max - pixel.g) * (deg / 50) : 0;
	        pixel.b += pixel.b !== max ? (max - pixel.b) * (deg / 50) : 0;
	      }
	
	      return pixel;
	    }
	
	    // 对比度
	
	  }, {
	    key: 'contrast',
	    value: function contrast(pixel, degree) {
	      var deg = parseInt(degree || this.defaultDegree, 10);
	
	      deg = Math.pow((deg + 100) / 100, 2);
	
	      if (this.checkOpts(pixel)) {
	        // Red Channel
	        pixel.r /= 255;
	        pixel.r -= .5;
	        pixel.r *= deg;
	        pixel.r += .5;
	        pixel.r *= 255;
	        // Green Channel
	        pixel.g /= 255;
	        pixel.g -= .5;
	        pixel.g *= deg;
	        pixel.g += .5;
	        pixel.g *= 255;
	        // Blue Channel
	        pixel.b /= 255;
	        pixel.b -= .5;
	        pixel.b *= deg;
	        pixel.b += .5;
	        pixel.b *= 255;
	      }
	
	      return pixel;
	    }
	
	    // 褐度
	
	  }, {
	    key: 'sepia',
	    value: function sepia(pixel, degree) {
	      var deg = parseInt(degree || this.defaultDegree, 10) / 100;
	      if (this.checkOpts(pixel)) {
	        pixel.r = Math.min(255, pixel.r * (1 - 0.607 * deg) + pixel.g * (0.769 * deg) + pixel.b * (0.189 * deg));
	        pixel.g = Math.min(255, pixel.r * (0.349 * deg) + pixel.g * (1 - 0.314 * deg) + pixel.b * (0.168 * deg));
	        pixel.b = Math.min(255, pixel.r * (0.272 * deg) + pixel.g * (0.534 * deg) + pixel.b * (1 - 0.869 * deg));;
	      }
	      return pixel;
	    }
	
	    // 噪点
	
	  }, {
	    key: 'noise',
	    value: function noise(pixel, degree) {
	      var deg = parseInt(degree || this.defaultDegree, 10);
	
	      var randomRange = function randomRange(min, max) {
	        var rand = min + Math.random() * (max - min);
	        return Math.round(rand) / 50;
	      };
	
	      deg = Math.abs(deg) * 255;
	
	      if (this.checkOpts(pixel)) {
	
	        var random = randomRange(deg * -1, deg);
	
	        pixel.r += random;
	        pixel.g += random;
	        pixel.b += random;
	      }
	
	      return pixel;
	    }
	
	    // 灰度
	
	  }, {
	    key: 'greyscale',
	    value: function greyscale(pixel) {
	      if (this.checkOpts(pixel)) {
	        var avg = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
	
	        pixel.r = avg;
	        pixel.g = avg;
	        pixel.b = avg;
	      }
	
	      return pixel;
	    }
	  }]);
	
	  return PlotitAdjuster;
	}();
	
	exports.default = new PlotitAdjuster();

/***/ },
/* 2 */
/*!****************************!*\
  !*** ./src/core/filter.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _layer = __webpack_require__(/*! ./layer */ 3);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlotitFilter = function () {
	  function PlotitFilter() {
	    _classCallCheck(this, PlotitFilter);
	
	    this.options = ['r', 'g', 'b'];
	  }
	
	  _createClass(PlotitFilter, [{
	    key: 'checkOpts',
	    value: function checkOpts(pixel) {
	      var keys = Object.keys(pixel);
	      return this.options.every(function (item) {
	        return keys.indexOf(item) !== -1;
	      });
	    }
	  }, {
	    key: 'bindUtil',
	    value: function bindUtil(util) {
	      this.util = util;
	    }
	  }, {
	    key: 'newLayer',
	    value: function newLayer(canvas) {
	      this.canvas = canvas;
	      this.layer = new _layer2.default(canvas, 'newFilter').layer;
	    }
	  }, {
	    key: 'renderLayer',
	    value: function renderLayer() {
	      this.canvas.getContext('2d').drawImage(this.layer, 0, 0);
	      console.log('render Filter ... is OK!');
	    }
	  }, {
	    key: 'moon',
	    value: function moon() {
	      this.util.processPixel('greyscale');
	    }
	  }, {
	    key: 'toaster',
	    value: function toaster() {
	
	      this.util.processPixel('brightness', 30);
	      this.util.processPixel('contrast', 18);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 3,
	          x1 = width / 2,
	          y1 = height / 2,
	          r1 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
	      grd.addColorStop(0, 'rgba(128, 78, 15, .2)');
	      grd.addColorStop(1, 'rgba(59, 0, 59, .2)');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }, {
	    key: '_1977',
	    value: function _1977() {
	
	      this.util.processPixel('brightness', 20);
	      this.util.processPixel('saturation', -10);
	      this.util.processPixel('contrast', 8);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, 0, 0, 0);
	      grd.addColorStop(0, 'rgba(243, 106, 188, .07)');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }, {
	    key: 'aden',
	    value: function aden() {
	      this.util.processPixel('brightness', 10);
	      this.util.processPixel('saturation', 5);
	      this.util.processPixel('contrast', 10);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 3,
	          x1 = width / 2,
	          y1 = height / 2,
	          r1 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
	      grd.addColorStop(0, 'rgba(66, 10, 14, .1)');
	      grd.addColorStop(1, 'transparent');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }, {
	    key: 'earlybird',
	    value: function earlybird() {
	      this.util.processPixel('saturation', -10);
	      this.util.processPixel('sepia', 15);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 3,
	          x1 = width / 2,
	          y1 = height / 2,
	          r1 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
	      grd.addColorStop(0, 'rgba(208, 186, 142, .15)');
	      grd.addColorStop(.75, 'rgba(54, 3, 9, .1)');
	      grd.addColorStop(1, 'rgba(29, 2, 16, .1)');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }, {
	    key: 'walden',
	    value: function walden() {
	      this.util.processPixel('brightness', 22);
	      this.util.processPixel('saturation', -18);
	      this.util.processPixel('sepia', 36);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, 0, 0, 0);
	      grd.addColorStop(0, 'rgba(20, 68, 204, .07)');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }, {
	    key: 'xpro2',
	    value: function xpro2() {
	      this.util.processPixel('contrast', 10);
	      this.util.processPixel('sepia', 20);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 3,
	          x1 = width / 2,
	          y1 = height / 2,
	          r1 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
	      grd.addColorStop(0, 'rgba(230, 231, 224, .15)');
	      grd.addColorStop(1, 'rgba(43, 42, 161, .05)');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }, {
	    key: 'lofi',
	    value: function lofi() {
	      this.util.processPixel('saturation', 15);
	      this.util.processPixel('contrast', 20);
	
	      var ctx = this.layer.getContext('2d'),
	          width = this.layer.width,
	          height = this.layer.height,
	          x0 = width / 2,
	          y0 = height / 2,
	          r0 = (width > height ? width : height) / 3,
	          x1 = width / 2,
	          y1 = height / 2,
	          r1 = (width > height ? width : height) / 2;
	
	      var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
	      grd.addColorStop(0, 'transparent');
	      grd.addColorStop(1, 'rgba(34, 34, 34, .12)');
	
	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, width, height);
	    }
	  }]);
	
	  return PlotitFilter;
	}();
	
	exports.default = new PlotitFilter();

/***/ },
/* 3 */
/*!***************************!*\
  !*** ./src/core/layer.js ***!
  \***************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlotitLayer = function () {
	  function PlotitLayer(canvas, id) {
	    _classCallCheck(this, PlotitLayer);
	
	    this.canvas = canvas;
	    this.id = id;
	    this.layer = this.new(id);
	  }
	
	  _createClass(PlotitLayer, [{
	    key: 'new',
	    value: function _new(id) {
	      var canvas = this.canvas,
	          width = canvas.width,
	          height = canvas.height,
	          top = canvas.style.top,
	          left = canvas.style.left;
	
	      var newCanvas = document.createElement('canvas');
	
	      newCanvas.id = id;
	      newCanvas.width = width;
	      newCanvas.height = height;
	      newCanvas.style.position = 'absolute';
	      newCanvas.style.top = top;
	      newCanvas.style.left = left;
	
	      return newCanvas;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (!document.querySelector('#' + this.id)) return;
	
	      var $frame = document.querySelector('#' + this.id),
	          $overlay = document.querySelector('#overlay'),
	          parent = $frame.parentNode;
	
	      parent.removeChild($frame);
	
	      if ($overlay) {
	        parent.removeChild($overlay);
	      }
	    }
	
	    // append to the panel
	
	  }, {
	    key: 'addFrame',
	    value: function addFrame(scale) {
	
	      this.clear();
	
	      var originW = this.layer.width,
	          originH = this.layer.height,
	          layerStyle = this.layer.style,
	          originT = parseFloat(layerStyle.top.replace('px', '')),
	          originL = parseFloat(layerStyle.left.replace('px', ''));
	
	      switch (scale.name) {
	        case '1:1':
	        case '4:3':
	        case '3:4':
	          var x = scale.x,
	              y = scale.y,
	              wh = originW / originH,
	              s = x / y,
	              min = void 0;
	
	          if (wh < s) {
	            this.layer.width = originW;
	            this.layer.height = originW / x * y;
	          } else if (wh > s) {
	            this.layer.height = originH;
	            this.layer.width = originH / y * x;
	          } else {
	            var _min = originW < originH ? originW : originH;
	            this.layer.width = _min;
	            this.layer.height = _min;
	          }
	          break;
	
	        case '自定义':
	        default:
	          break;
	      }
	
	      layerStyle.top = originT + (originH - this.layer.height) / 2 + 'px';
	      layerStyle.left = originL + (originW - this.layer.width) / 2 + 'px';
	
	      this.drawCropImage(this.layer, {
	        originW: originW,
	        originH: originH,
	        cropW: this.layer.width,
	        cropH: this.layer.height
	      });
	
	      this.drawFrameLine(this.layer);
	
	      this.addOverlay(originW, originH);
	
	      this.canvas.parentNode.appendChild(this.layer);
	
	      return {
	        layer: this.layer,
	        originW: originW,
	        originH: originH,
	        cropW: this.layer.width,
	        cropH: this.layer.height
	      };
	    }
	  }, {
	    key: 'drawCropImage',
	    value: function drawCropImage(canvas, opts) {
	      var cropCxt = canvas.getContext('2d'),
	          originCtx = this.canvas.getContext('2d'),
	          x = opts.x || (opts.originW - opts.cropW) / 2,
	          y = opts.y || (opts.originH - opts.cropH) / 2;
	
	      var originImageData = originCtx.getImageData(x, y, opts.originW, opts.originH);
	
	      cropCxt.clearRect(0, 0, opts.cropW, opts.cropH);
	      cropCxt.putImageData(originImageData, 0, 0);
	    }
	  }, {
	    key: 'drawFrameLine',
	    value: function drawFrameLine(canvas) {
	      var cxt = canvas.getContext('2d'),
	          w = canvas.width,
	          h = canvas.height;
	
	      cxt.strokeStyle = 'rgba(255, 255, 255, .5)';
	      cxt.lineWidth = 1;
	      cxt.strokeRect(0, h / 3, w, h / 3);
	      cxt.strokeRect(w / 3, 0, w / 3, h);
	
	      cxt.strokeStyle = '#FFF';
	      cxt.lineWidth = 5;
	      cxt.strokeRect(0, 0, w, h);
	
	      var rW = 10;
	      cxt.fillStyle = '#FFF';
	      cxt.fillRect(0, 0, rW, rW);
	      cxt.fillRect(w - rW, 0, rW, rW);
	      cxt.fillRect(w - rW, h - rW, rW, rW);
	      cxt.fillRect(0, h - rW, rW, rW);
	    }
	  }, {
	    key: 'addOverlay',
	    value: function addOverlay(w, h) {
	
	      if (document.querySelector('#overlay')) return;
	
	      this.overlay = this.new('overlay');
	
	      var overlayCtx = this.overlay.getContext('2d');
	      overlayCtx.fillStyle = 'rgba(0, 0, 0, .7)';
	      overlayCtx.fillRect(0, 0, w, h);
	
	      this.canvas.parentNode.appendChild(this.overlay);
	    }
	  }]);
	
	  return PlotitLayer;
	}();
	
	exports.default = PlotitLayer;

/***/ },
/* 4 */
/*!****************************!*\
  !*** ./src/core/resize.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _layer = __webpack_require__(/*! ./layer */ 3);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlotitResize = function () {
	  function PlotitResize() {
	    _classCallCheck(this, PlotitResize);
	  }
	
	  _createClass(PlotitResize, [{
	    key: 'bindUtil',
	    value: function bindUtil(util) {
	      this.util = util;
	    }
	  }, {
	    key: 'cropImage',
	    value: function cropImage(canvas, opts) {
	      var ctx = canvas.getContext('2d'),
	          ct = parseInt(canvas.style.top.replace('px', '')),
	          cl = parseInt(canvas.style.left.replace('px', '')),
	          cw = canvas.width,
	          ch = canvas.height,
	          x = opts.x,
	          y = opts.y,
	          w = opts.w,
	          h = opts.h;
	
	      var cropImageData = ctx.getImageData(x, y, w, h);
	
	      ctx.putImageData(cropImageData, 0, 0);
	
	      canvas.width = w;
	      canvas.height = h;
	      canvas.style.left = cl + (cw - w) / 2 + 'px';
	      canvas.style.top = ct + (ch - h) / 2 + 'px';
	    }
	  }, {
	    key: 'newFrame',
	    value: function newFrame(canvas, scale) {
	      this.canvas = canvas;
	      this.Layer = new _layer2.default(canvas, 'newFrame');
	      this.layerInfo = this.Layer.addFrame(scale);
	    }
	  }, {
	    key: 'removeFrame',
	    value: function removeFrame() {
	      if (this.Layer) {
	        this.Layer.clear();
	      }
	    }
	  }, {
	    key: 'bindFrame',
	    value: function bindFrame(scale) {
	      var self = this,
	          $layer = this.layerInfo.layer,
	          originW = this.layerInfo.originW,
	          originH = this.layerInfo.originH,
	          cropW = this.layerInfo.cropW,
	          cropH = this.layerInfo.cropH,
	          isDragging = false,
	          pos = {};
	
	      function isInTheRange(x, y, size) {
	        return x > size && x < cropW - size && y > size && y < cropH - size;
	      }
	
	      $layer.addEventListener('mousedown', function dragging(e) {
	
	        var x = e.layerX,
	            y = e.layerY,
	            elem = e.target || e.srcElement,
	            moveSize = 10;
	
	        if (isInTheRange(x, y, moveSize)) {
	          isDragging = true;
	          pos.dragX = x;
	          pos.dragY = y;
	        }
	      }, false);
	
	      $layer.addEventListener('mousemove', function moving(e) {
	
	        var x = e.layerX,
	            y = e.layerY,
	            moveSize = 10,
	            cropStyle = $layer.style,
	            originStyle = self.canvas.style,
	            cropT = parseFloat(cropStyle.top.replace('px', '')) || 0,
	            cropL = parseFloat(cropStyle.left.replace('px', '')) || 0,
	            originT = parseFloat(originStyle.top.replace('px', '')) || 0,
	            originL = parseFloat(originStyle.left.replace('px', '')) || 0;
	
	        if (isInTheRange(x, y, moveSize) && isDragging) {
	
	          pos.moveX = x;
	          pos.moveY = y;
	
	          var movedx = cropL + (pos.moveX - pos.dragX),
	              movedy = cropT + (pos.moveY - pos.dragY),
	              mindx = originL,
	              mindy = originT,
	              maxdx = originL + originW - cropW,
	              maxdy = originT + originH - cropH;
	
	          var styleTop = movedy >= mindy && movedy <= maxdy ? movedy : cropT,
	              styleLeft = movedx >= mindx && movedx <= maxdx ? movedx : cropL;
	
	          $layer.style.top = styleTop + 'px';
	          $layer.style.left = styleLeft + 'px';
	
	          self.dx = styleLeft - originL < 0 ? 0 : styleLeft - originL;
	          self.dy = styleTop - originT < 0 ? 0 : styleTop - originT;
	
	          self.Layer.drawCropImage($layer, {
	            originH: originH,
	            originW: originW,
	            cropH: cropH,
	            cropW: cropW,
	            x: self.dx,
	            y: self.dy
	          });
	
	          self.Layer.drawFrameLine($layer);
	
	          self.setPreview(self.$preview, self.dx, self.dy);
	        }
	      }, false);
	
	      $layer.addEventListener('mouseup', function dropping(e) {
	        var x = e.layerX,
	            y = e.layerY,
	            moveSize = 10;
	
	        isDragging = false;
	        if (isInTheRange(x, y, moveSize)) {
	          console.log('dropping', x, y);
	        }
	      }, false);
	    }
	  }, {
	    key: 'getFrame',
	    value: function getFrame() {
	      if (this.cropImageData) {
	        var originW = this.canvas.width,
	            originH = this.canvas.height,
	            canvasStyle = this.canvas.style,
	            originT = parseFloat(canvasStyle.top.replace('px', '')),
	            originL = parseFloat(canvasStyle.left.replace('px', '')),
	            cropW = this.cropImageData.width,
	            cropH = this.cropImageData.height,
	            originCtx = this.canvas.getContext('2d');
	
	        this.canvas.width = cropW;
	        this.canvas.height = cropH;
	        originCtx.putImageData(this.cropImageData, 0, 0);
	
	        canvasStyle.top = originT + (originH - cropH) / 2 + 'px';
	        canvasStyle.left = originL + (originW - cropW) / 2 + 'px';
	
	        this.removeFrame();
	      }
	
	      return this.resizeConfig || {};
	    }
	  }, {
	    key: 'setPreview',
	    value: function setPreview(canvas, x, y) {
	      var originCtx = this.canvas.getContext('2d'),
	          previewCtx = canvas.getContext('2d'),
	          previewW = canvas.width,
	          cropW = this.layerInfo.cropW,
	          cropH = this.layerInfo.cropH;
	
	      x = x || (this.layerInfo.originW - cropW) / 2, y = y || (this.layerInfo.originH - cropH) / 2;
	
	      this.$preview = canvas;
	
	      this.resizeConfig = {
	        x: x,
	        y: y,
	        w: cropW,
	        h: cropH
	      };
	
	      this.cropImageData = originCtx.getImageData(x, y, cropW, cropH);
	
	      canvas.width = 224;
	      canvas.height = canvas.width / cropW * cropH;
	
	      var tempCanvas = document.createElement('canvas'),
	          tempCtx = tempCanvas.getContext('2d');
	
	      tempCanvas.width = cropW;
	      tempCanvas.height = cropH;
	      tempCtx.putImageData(this.cropImageData, 0, 0);
	
	      var tempImg = new Image(),
	          tempImgUrl = tempCanvas.toDataURL();
	
	      tempImg.src = tempImgUrl;
	
	      previewCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
	    }
	  }]);
	
	  return PlotitResize;
	}();
	
	exports.default = new PlotitResize();

/***/ }
/******/ ]);
//# sourceMappingURL=plotit.js.map