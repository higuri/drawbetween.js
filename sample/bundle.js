(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// drawbetween/index.js
var _ImagesOptions = /** @class */ (function () {
    function _ImagesOptions() {
        this.width = 'original';
        this.height = 'original';
        this.rotate = 'auto';
        this.minInterval = 0;
        this.borderColor = "#000";
        this.borderWidth = 0;
    }
    return _ImagesOptions;
}());
var _LineOptions = /** @class */ (function () {
    function _LineOptions() {
        this.width = 1;
        this.strokeColor = "#000000";
        this.lineDash = [0, 0];
    }
    return _LineOptions;
}());
var _RectsOptions = /** @class */ (function () {
    function _RectsOptions() {
        this.width = 20;
        this.height = 20;
        this.rotate = 'auto';
        this.minInterval = 0;
        this.strokeColor = "#000";
        this.strokeWidth = 1;
        this.fillColor = "";
    }
    return _RectsOptions;
}());
var _CirclesOptions = /** @class */ (function () {
    function _CirclesOptions() {
        this.radius = 10;
        this.minInterval = 0;
        this.strokeColor = "#000";
        this.strokeWidth = 1;
        this.fillColor = "";
    }
    return _CirclesOptions;
}());
var _TrianglesOptions = /** @class */ (function () {
    function _TrianglesOptions() {
        this.edgeLength = 20;
        this.rotate = 'auto';
        this.minInterval = 0;
        this.strokeColor = "#000";
        this.strokeWidth = 1;
        this.fillColor = "";
    }
    return _TrianglesOptions;
}());
var _CrossMarksOptions = /** @class */ (function () {
    function _CrossMarksOptions() {
        this.lineLength = 20;
        this.rotate = 'auto';
        this.minInterval = 0;
        this.strokeColor = "#000";
        this.strokeWidth = 1;
    }
    return _CrossMarksOptions;
}());
var _WithDrawerOptions = /** @class */ (function () {
    function _WithDrawerOptions() {
        this.minInterval = 20;
    }
    return _WithDrawerOptions;
}());
//
// DrawBetween
//
var DrawBetween = /** @class */ (function () {
    function DrawBetween(elem) {
        var cv = DrawBetween.appendCanvas(elem);
        this.ctx = cv.getContext("2d");
    }
    // appendCanvas()
    DrawBetween.appendCanvas = function (elem) {
        var cv = document.createElement("canvas");
        var resizeCv = function () {
            cv.width = elem.clientWidth;
            cv.height = elem.clientHeight;
        };
        cv.style.pointerEvents = "none";
        resizeCv();
        // make canvas responsive:
        // TODO: actually it is not enough to just listen to
        //       window.resize event. We should listen to
        //       the parent element's resize event...
        //       Use 'ResizeObserver' ? (available only in Chrome).
        window.addEventListener("resize", resizeCv);
        elem.appendChild(cv);
        return cv;
    };
    // getPointsBetween()
    //  return points between (p0, p1) with specified intervals.
    DrawBetween.getPointsBetween = function (p0, p1, minInterval) {
        // len: length of (p0->p1)
        var len = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
        // n: number of points
        if (minInterval < 1) {
            return [];
        }
        var _n = Math.floor(len / minInterval);
        var remainder = len - _n * minInterval;
        var n = _n + 1;
        // interval:
        var interval = minInterval + remainder / n;
        // dx, dy: amount of change on X and Y to l on the Line(y=mx).
        var l = interval;
        var dx;
        var dy;
        if (p0.x === p1.x) {
            // line(p0->p1): x = C
            dx = 0;
            dy = l;
            if (p1.y < p0.y) {
                dy = -dy;
            }
        }
        else {
            // line(p0->p1): y = mx
            var m = (p0.y - p1.y) / (p0.x - p1.x);
            // l^2 = x^2 + y^2
            // -> l^2 = x^2 + (mx)^2
            // -> x^2 = l^2 / (m^2 + 1)
            dx = Math.sqrt(Math.pow(l, 2) / (Math.pow(m, 2) + 1));
            dy = m * dx;
            if (p1.x < p0.x) {
                dx = -dx;
                dy = -dy;
            }
        }
        var points = [];
        for (var i = 0; i < n; i++) {
            points.push({
                x: Math.floor(p0.x + dx * i),
                y: Math.floor(p0.y + dy * i)
            });
        }
        return points;
    };
    // getPointsFor()
    //   return points for drawing objects (width, height)
    //   at the specified intervals.
    DrawBetween.getPointsFor = function (p0, p1, width, height, minInterval) {
        if (minInterval === void 0) { minInterval = 0; }
        // len: object's length on line(p0->p1);
        var len;
        if (p0.x === p1.x) {
            // y = C
            len = height;
        }
        else if (p0.y === p1.y) {
            // x = C
            len = width;
        }
        else {
            // line(p0->p1): y = mx
            var m = (p0.y - p1.y) / (p0.x - p1.x);
            if (Math.abs(m) * width < height) {
                len = Math.sqrt(Math.pow(width, 2) + Math.pow(m * width, 2));
            }
            else {
                len = Math.sqrt(Math.pow(height / m, 2) + Math.pow(height, 2));
            }
        }
        return DrawBetween.getPointsBetween(p0, p1, len + minInterval);
    };
    // clear()
    DrawBetween.prototype.clear = function () {
        var cv = this.ctx.canvas;
        this.ctx.clearRect(0, 0, cv.width, cv.height);
    };
    // images()
    DrawBetween.prototype.images = function (p0, p1, imageUrl, options) {
        var _this = this;
        var defaultOptions = new _ImagesOptions();
        var opts = Object.assign(defaultOptions, options);
        var minInterval = opts.minInterval;
        var doit = function (img) {
            var imageWidth = opts.width === 'original' ?
                img.width : opts.width;
            var imageHeight = opts.height === 'original' ?
                img.height : opts.height;
            var rotate = opts.rotate === 'auto' ?
                Math.atan((p0.y - p1.y) / (p0.x - p1.x)) : opts.rotate;
            _this.ctx.save();
            if (0 < opts.borderWidth) {
                _this.ctx.lineWidth = opts.borderWidth;
                _this.ctx.strokeStyle = opts.borderColor;
            }
            DrawBetween.getPointsFor(p0, p1, imageWidth + opts.borderWidth * 2, imageHeight + opts.borderWidth * 2, minInterval).forEach(function (p) {
                _this.ctx.save();
                // change rotation center & rotate.
                _this.ctx.translate(p.x, p.y);
                _this.ctx.rotate(rotate);
                _this.ctx.beginPath();
                // draw border.
                if (0 < opts.borderWidth) {
                    _this.ctx.rect(Math.floor(opts.borderWidth / 2), Math.floor(opts.borderWidth / 2), imageWidth + opts.borderWidth, imageHeight + opts.borderWidth);
                    _this.ctx.stroke();
                }
                // draw image.
                _this.ctx.drawImage(img, opts.borderWidth, opts.borderWidth, imageWidth, imageHeight);
                // restore for next loop.
                _this.ctx.restore();
            });
            // restore for next call.
            _this.ctx.restore();
        };
        var img = new Image();
        img.onload = function () {
            doit(img);
        };
        img.src = imageUrl;
    };
    // line()
    DrawBetween.prototype.line = function (p0, p1, options) {
        var defaultOptions = new _LineOptions();
        var opts = Object.assign(defaultOptions, options);
        this.ctx.save();
        this.ctx.lineWidth = opts.width;
        this.ctx.strokeStyle = opts.strokeColor;
        this.ctx.setLineDash(opts.lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(p0.x, p0.y);
        this.ctx.lineTo(p1.x, p1.y);
        this.ctx.stroke();
        this.ctx.restore();
    };
    // circles()
    DrawBetween.prototype.circles = function (p0, p1, options) {
        var _this = this;
        var defaultOptions = new _CirclesOptions();
        var opts = Object.assign(defaultOptions, options);
        var radius = opts.radius;
        var minInterval = opts.minInterval;
        this.ctx.save();
        if (0 < opts.strokeWidth) {
            this.ctx.lineWidth = opts.strokeWidth;
            this.ctx.strokeStyle = opts.strokeColor;
        }
        if (opts.fillColor != '') {
            this.ctx.fillStyle = opts.fillColor;
        }
        DrawBetween.getPointsFor(p0, p1, radius * 2 + opts.strokeWidth, radius * 2 + opts.strokeWidth, minInterval).forEach(function (p) {
            _this.ctx.beginPath();
            _this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
            if (0 < opts.strokeWidth) {
                _this.ctx.stroke();
            }
            if (opts.fillColor !== '') {
                _this.ctx.fill();
            }
        });
        this.ctx.restore();
    };
    // rects()
    DrawBetween.prototype.rects = function (p0, p1, options) {
        var _this = this;
        var defaultOptions = new _RectsOptions();
        var opts = Object.assign(defaultOptions, options);
        var width = opts.width;
        var height = opts.height;
        var rotate = opts.rotate === 'auto' ?
            Math.atan((p0.y - p1.y) / (p0.x - p1.x)) : opts.rotate;
        var minInterval = opts.minInterval;
        this.ctx.save();
        if (0 < opts.strokeWidth) {
            this.ctx.lineWidth = opts.strokeWidth;
            this.ctx.strokeStyle = opts.strokeColor;
        }
        if (opts.fillColor !== '') {
            this.ctx.fillStyle = opts.fillColor;
        }
        DrawBetween.getPointsFor(p0, p1, width + opts.strokeWidth, height + opts.strokeWidth, minInterval).forEach(function (p) {
            _this.ctx.save();
            _this.ctx.translate(p.x, p.y);
            _this.ctx.rotate(rotate);
            _this.ctx.beginPath();
            _this.ctx.rect(0, 0, width, height);
            if (0 < opts.strokeWidth) {
                _this.ctx.stroke();
            }
            if (opts.fillColor !== '') {
                _this.ctx.fill();
            }
            _this.ctx.restore();
        });
        this.ctx.restore();
    };
    // triangles()
    DrawBetween.prototype.triangles = function (p0, p1, options) {
        var _this = this;
        var defaultOptions = new _TrianglesOptions();
        var opts = Object.assign(defaultOptions, options);
        var edgeLength = opts.edgeLength;
        var dx = Math.floor(edgeLength / 2);
        var dy = Math.floor((edgeLength * Math.sqrt(3)) / 2);
        var minInterval = opts.minInterval;
        var rotate = opts.rotate === 'auto' ?
            Math.atan((p0.y - p1.y) / (p0.x - p1.x)) : opts.rotate;
        this.ctx.save();
        if (0 < opts.strokeWidth) {
            this.ctx.lineWidth = opts.strokeWidth;
            this.ctx.strokeStyle = opts.strokeColor;
        }
        if (opts.fillColor !== '') {
            this.ctx.fillStyle = opts.fillColor;
        }
        DrawBetween.getPointsFor(p0, p1, edgeLength + opts.strokeWidth, edgeLength + opts.strokeWidth, minInterval).forEach(function (p) {
            _this.ctx.save();
            _this.ctx.translate(p.x, p.y);
            _this.ctx.rotate(rotate);
            _this.ctx.beginPath();
            // top
            _this.ctx.moveTo(0, 0);
            // bottom-left
            _this.ctx.lineTo(-dx, +dy);
            // bottom-right
            _this.ctx.lineTo(+dx, +dy);
            _this.ctx.closePath();
            if (0 < opts.strokeWidth) {
                _this.ctx.stroke();
            }
            if (opts.fillColor !== '') {
                _this.ctx.fill();
            }
            _this.ctx.restore();
        });
        this.ctx.restore();
    };
    // crossMarks()
    DrawBetween.prototype.crossMarks = function (p0, p1, options) {
        var _this = this;
        var defaultOptions = new _CrossMarksOptions();
        var opts = Object.assign(defaultOptions, options);
        var lineLength = opts.lineLength;
        var d = Math.floor(lineLength / (2 * Math.sqrt(2)));
        var size = Math.floor((lineLength + opts.strokeWidth) / Math.sqrt(2));
        var minInterval = opts.minInterval;
        var rotate = opts.rotate === 'auto' ?
            Math.atan((p0.y - p1.y) / (p0.x - p1.x)) : opts.rotate;
        this.ctx.save();
        if (0 < opts.strokeWidth) {
            this.ctx.lineWidth = opts.strokeWidth;
            this.ctx.strokeStyle = opts.strokeColor;
        }
        DrawBetween.getPointsFor(p0, p1, size, size, minInterval).forEach(function (p) {
            _this.ctx.save();
            _this.ctx.translate(p.x, p.y);
            _this.ctx.rotate(rotate);
            _this.ctx.beginPath();
            _this.ctx.beginPath();
            // upper-left
            _this.ctx.moveTo(-d, -d);
            // bottom-right
            _this.ctx.lineTo(+d, +d);
            // upper-right
            _this.ctx.moveTo(+d, -d);
            // bottom-left
            _this.ctx.lineTo(-d, +d);
            if (0 < opts.strokeWidth) {
                _this.ctx.stroke();
            }
            _this.ctx.restore();
        });
        this.ctx.restore();
    };
    // withDrawer()
    DrawBetween.prototype.withDrawer = function (p0, p1, drawer, options) {
        var _this = this;
        var defaultOptions = new _WithDrawerOptions();
        var opts = Object.assign(defaultOptions, options);
        var minInterval = opts.minInterval;
        DrawBetween.getPointsFor(p0, p1, 0, 0, minInterval).forEach(function (p) {
            drawer(_this.ctx, p);
        });
    };
    return DrawBetween;
}());

module.exports = DrawBetween;

},{}],2:[function(require,module,exports){
// main.js

const DrawBetween = require('../dist/drawbetween_cjs');

// main()
function main() {
  let p0;
  let fixed = false;
  const canvas = document.querySelector('#canvas');
  // drawbetween:
  const draw = new DrawBetween(canvas);
  let lineOpts = {
    width: 10,
    strokeColor: "#0FF",
    lineDash: [20, 10]
  };
  let trianglesOpts = {
    edgeLength: 20,
    rotate: 'auto',
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 10,
    fillColor: "#FF0"
  };
  let crossMarksOpts = {
    lineLength: 40,
    rotate: 'auto',
    minInterval: 0,
    strokeColor: "#F00",
    strokeWidth: 10
  };
  let rectsOpts = {
    width: 20,
    height: 20,
    rotate: 'auto',
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 10,
    fillColor: "#FF0"
  };
  let circlesOpts = {
    radius: 10,
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 10,
    fillColor: "#FF0"
  };
  let imagesOpts = {
    width: 'original',
    height: 'original',
    rotate: 'auto',
    minInterval: 0,
    borderColor: "#000",
    borderWidth: 0
  };
  let withDrawerOpts = {
    minInterval: 20
  };
  let withDrawerFunction = (() => {});
  let drawer = (p0, p1) => { draw.circles(p0, p1, circlesOpts) };
  // canvas:
  canvas.addEventListener('click', (evt) => {
    if (p0 && !fixed) {
      fixed = true;
    } else {
      p0 = {
        x: evt.offsetX,
        y: evt.offsetY
      };
      fixed = false;
    }
  });
  canvas.addEventListener('mousemove', (evt) => {
    if (p0 && !fixed) {
      p1 = {
        x: evt.offsetX,
        y: evt.offsetY
      };
      draw.clear();
      drawer(p0, p1);
    }
  });
  // drawtypes:
  const radios = document.querySelectorAll('.radio');
  const activateDrawType = ((t) => {
    const types = [
      'circles', 'rects', 'triangles', 'cross_marks',
      'line',  'drawer', 'images'];
    for (const t1 of types) {
      const eid0 = '#' + t1 + '_div';
      const e0 = document.querySelector(eid0);
      const eid1 = '#' + t1 + '_option';
      const e1 = document.querySelector(eid1);
      if (t === t1) {
        e0.classList.remove('inactive');
        e0.classList.add('active');
        e1.classList.remove('hidden');
      } else {
        e0.classList.remove('active');
        e0.classList.add('inactive');
        e1.classList.add('hidden');
      }
    }
  });
  for (let i = 0; i < radios.length; i++) {
    const radio = radios[i];
    radio.addEventListener('change', () => {
      if (radio.checked) {
        switch (radio.value) {
          case 'circles':
            drawer = (p0, p1) => {
              draw.circles(p0, p1, circlesOpts)
            };
            activateDrawType('circles');
            break;
          case 'rects':
            drawer = (p0, p1) => {
              draw.rects(p0, p1, rectsOpts)
            };
            activateDrawType('rects');
            break;
          case 'triangles':
            drawer = (p0, p1) => {
              draw.triangles(p0, p1, trianglesOpts)
            };
            activateDrawType('triangles');
            break;
          case 'cross_marks':
            drawer = (p0, p1) => {
              draw.crossMarks(p0, p1, crossMarksOpts)
            };
            activateDrawType('cross_marks');
            break;
          case 'line':
            drawer = (p0, p1) => {
              draw.line(p0, p1, lineOpts)
            };
            activateDrawType('line');
            break;
          case 'images':
            drawer = (p0, p1) => {
              draw.images(p0, p1, './images/octocat.png', imagesOpts)
            };
            activateDrawType('images');
            break;
          case 'drawer':
            drawer = (p0, p1) => {
              draw.withDrawer(p0, p1, withDrawerFunction, withDrawerOpts)
            };
            activateDrawType('drawer');
            break;
          default:
            break;
        }
      }
    });
  }
  // circlesOpts:
  const circlesRadius = document.querySelector('#circles_radius');
  circlesRadius.value = circlesOpts.radius;
  circlesRadius.addEventListener(
    'change', (evt) => {
      circlesOpts.radius = parseInt(evt.target.value);
    });
  const circlesMinInterval = document.querySelector('#circles_min_interval');
  circlesMinInterval.value = circlesOpts.minInterval;
  circlesMinInterval.addEventListener(
    'change', (evt) => {
      circlesOpts.minInterval = parseInt(evt.target.value);
    });
  const circlesStrokeColor = document.querySelector('#circles_stroke_color');
  circlesStrokeColor.value = circlesOpts.strokeColor;
  circlesStrokeColor.addEventListener(
    'change', (evt) => {
      circlesOpts.strokeColor = evt.target.value;
    });
  const circlesStrokeWidth = document.querySelector('#circles_stroke_width');
  circlesStrokeWidth.value = circlesOpts.strokeWidth;
  circlesStrokeWidth.addEventListener(
    'change', (evt) => {
      circlesOpts.strokeWidth = parseInt(evt.target.value);
    });
  const circlesFillColor = document.querySelector('#circles_fill_color');
  circlesFillColor.value = circlesOpts.fillColor;
  circlesFillColor.addEventListener(
    'change', (evt) => {
      circlesOpts.fillColor = evt.target.value;
    });
  // rectsOpts:
  const rectsWidth = document.querySelector('#rects_width');
  rectsWidth.value = rectsOpts.width;
  rectsWidth.addEventListener(
    'change', (evt) => {
      rectsOpts.width = parseInt(evt.target.value);
    });
  const rectsHeight = document.querySelector('#rects_height');
  rectsHeight.value = rectsOpts.height;
  rectsHeight.addEventListener(
    'change', (evt) => {
      rectsOpts.height = parseInt(evt.target.value);
    });
  const rectsRotate = document.querySelector('#rects_rotate');
  rectsRotate.value = rectsOpts.rotate;
  rectsRotate.addEventListener(
    'change', (evt) => {
      rectsOpts.rotate = evt.target.value === 'auto' ?
        'auto' : parseInt(evt.target.value) * Math.PI / 180;
    });
  const rectsMinInterval = document.querySelector('#rects_min_interval');
  rectsMinInterval.value = rectsOpts.minInterval;
  rectsMinInterval.addEventListener(
    'change', (evt) => {
      rectsOpts.minInterval = parseInt(evt.target.value);
    });
  const rectsStrokeColor = document.querySelector('#rects_stroke_color');
  rectsStrokeColor.value = rectsOpts.strokeColor;
  rectsStrokeColor.addEventListener(
    'change', (evt) => {
      rectsOpts.strokeColor = evt.target.value;
    });
  const rectsStrokeWidth = document.querySelector('#rects_stroke_width');
  rectsStrokeWidth.value = rectsOpts.strokeWidth;
  rectsStrokeWidth.addEventListener(
    'change', (evt) => {
      rectsOpts.strokeWidth = parseInt(evt.target.value);
    });
  const rectsFillColor = document.querySelector('#rects_fill_color');
  rectsFillColor.value = rectsOpts.fillColor;
  rectsFillColor.addEventListener(
    'change', (evt) => {
      rectsOpts.fillColor = evt.target.value;
    });
  // trianglesOpts:
  const trianglesEdgeLength = document.querySelector('#triangles_edge_length');
  trianglesEdgeLength.value = trianglesOpts.edgeLength;
  trianglesEdgeLength.addEventListener(
    'change', (evt) => {
      trianglesOpts.edgeLength = parseInt(evt.target.value);
    });
  const trianglesRotate = document.querySelector('#triangles_rotate');
  trianglesRotate.value = trianglesOpts.rotate;
  trianglesRotate.addEventListener(
    'change', (evt) => {
      trianglesOpts.rotate = evt.target.value === 'auto' ?
        'auto' : parseInt(evt.target.value) * Math.PI / 180;
    });
  const trianglesMinInterval = document.querySelector('#triangles_min_interval');
  trianglesMinInterval.value = trianglesOpts.minInterval;
  trianglesMinInterval.addEventListener(
    'change', (evt) => {
      trianglesOpts.minInterval = parseInt(evt.target.value);
    });
  const trianglesStrokeColor = document.querySelector('#triangles_stroke_color');
  trianglesStrokeColor.value = trianglesOpts.strokeColor;
  trianglesStrokeColor.addEventListener(
    'change', (evt) => {
      trianglesOpts.strokeColor = evt.target.value;
    });
  const trianglesStrokeWidth = document.querySelector('#triangles_stroke_width');
  trianglesStrokeWidth.value = trianglesOpts.strokeWidth;
  trianglesStrokeWidth.addEventListener(
    'change', (evt) => {
      trianglesOpts.strokeWidth = parseInt(evt.target.value);
    });
  const trianglesFillColor = document.querySelector('#triangles_fill_color');
  trianglesFillColor.value = trianglesOpts.fillColor;
  trianglesFillColor.addEventListener(
    'change', (evt) => {
      trianglesOpts.fillColor = evt.target.value;
    });
  // crossMarksOpts:
  const crossMarksLineLength = document.querySelector('#cross_marks_line_length');
  crossMarksLineLength.value = crossMarksOpts.lineLength;
  crossMarksLineLength.addEventListener(
    'change', (evt) => {
      crossMarksOpts.lineLength = parseInt(evt.target.value);
    });
  const crossMarksRotate = document.querySelector('#cross_marks_rotate');
  crossMarksRotate.value = crossMarksOpts.rotate;
  crossMarksRotate.addEventListener(
    'change', (evt) => {
      crossMarksOpts.rotate = evt.target.value === 'auto' ?
        'auto' : parseInt(evt.target.value) * Math.PI / 180;
    });
  const crossMarksMinInterval = document.querySelector('#cross_marks_min_interval');
  crossMarksMinInterval.value = crossMarksOpts.minInterval;
  crossMarksMinInterval.addEventListener(
    'change', (evt) => {
      crossMarksOpts.minInterval = parseInt(evt.target.value);
    });
  const crossMarksStrokeColor = document.querySelector('#cross_marks_stroke_color');
  crossMarksStrokeColor.value = crossMarksOpts.strokeColor;
  crossMarksStrokeColor.addEventListener(
    'change', (evt) => {
      crossMarksOpts.strokeColor = evt.target.value;
    });
  const crossMarksStrokeWidth = document.querySelector('#cross_marks_stroke_width');
  crossMarksStrokeWidth.value = crossMarksOpts.strokeWidth;
  crossMarksStrokeWidth.addEventListener(
    'change', (evt) => {
      crossMarksOpts.strokeWidth = parseInt(evt.target.value);
    });
  // lineOpts:
  const lineWidth = document.querySelector('#line_width');
  lineWidth.value = lineOpts.width;;
  lineWidth.addEventListener(
    'change', (evt) => {
      lineOpts.width = parseInt(evt.target.value);
    });
  const lineStrokeColor = document.querySelector('#line_stroke_color');
  lineStrokeColor.value = lineOpts.strokeColor;
  lineStrokeColor.addEventListener(
    'change', (evt) => {
      lineOpts.strokeColor = evt.target.value;
    });
  const lineDash = document.querySelector('#line_dash');
  lineDash.value = lineOpts.lineDash;
  lineDash.addEventListener(
    'change', (evt) => {
      lineOpts.lineDash = evt.target.value.split(',').map(s => parseInt(s));
    });
  // imagesOpts:
  const imagesWidth = document.querySelector('#images_width');
  imagesWidth.value = imagesOpts.width;
  imagesWidth.addEventListener(
    'change', (evt) => {
      imagesOpts.width = evt.target.value === 'original' ?
        'original' : parseInt(evt.target.value);
    });
  const imagesHeight = document.querySelector('#images_height');
  imagesHeight.value = imagesOpts.height;
  imagesHeight.addEventListener(
    'change', (evt) => {
      imagesOpts.height = evt.target.value === 'original' ?
        'original' : parseInt(evt.target.value);
    });
  const imagesRotate = document.querySelector('#images_rotate');
  imagesRotate.value = imagesOpts.rotate;
  imagesRotate.addEventListener(
    'change', (evt) => {
      imagesOpts.rotate = evt.target.value === 'auto' ?
        'auto' : parseInt(evt.target.value) * Math.PI / 180;
    });
  const imagesMinInterval = document.querySelector('#images_min_interval');
  imagesMinInterval.value = imagesOpts.minInterval;
  imagesMinInterval.addEventListener(
    'change', (evt) => {
      imagesOpts.minInterval = parseInt(evt.target.value);
    });
  const imagesBorderColor = document.querySelector('#images_border_color');
  imagesBorderColor.value = imagesOpts.borderColor;
  imagesBorderColor.addEventListener(
    'change', (evt) => {
      imagesOpts.borderColor = evt.target.value;
    });
  const imagesBorderWidth = document.querySelector('#images_border_width');
  imagesBorderWidth.value = imagesOpts.borderWidth;
  imagesBorderWidth.addEventListener(
    'change', (evt) => {
      imagesOpts.borderWidth = parseInt(evt.target.value);
    });
  // drawer:
  const drawerMinInterval = document.querySelector('#drawer_min_interval');
  drawerMinInterval.value = withDrawerOpts.minInterval;
  drawerMinInterval.addEventListener(
    'change', (evt) => {
      withDrawerOpts.minInterval = parseInt(evt.target.value);
    });
  const drawerFunction = document.querySelector('#drawer_function');
  const setDrawerFunction = (() => {
    const code = drawerFunction.value;
    withDrawerFunction = ((ctx, p) => {
      const x = p.x;
      const y = p.y;
      eval(code);
    });
  });
  drawerFunction.addEventListener('change', () => setDrawerFunction());
  drawerFunction.value = 
    'const len = 15;\n' +
    'ctx.strokeStyle = \'#f00\';\n' + 
    'ctx.lineWidth = \'5\';\n' +
    'ctx.beginPath();\n' + 
    'ctx.moveTo(x, y);\n' +
    'ctx.lineTo(x + len, y + len);\n' +
    'ctx.moveTo(x + len, y);\n' +
    'ctx.lineTo(x, y + len);\n' +
    'ctx.stroke();';
  setDrawerFunction();
}

document.addEventListener('DOMContentLoaded', () => main());

},{"../dist/drawbetween_cjs":1}]},{},[2]);
