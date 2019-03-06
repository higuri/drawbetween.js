(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// sample/index.js

const DrawBetween = require('drawbetween');

// main()
function main() {
  let p0;
  let fixed = false;
  const canvas = document.querySelector('#canvas');
  // drawbetween:
  const draw = new DrawBetween(canvas);
  let lineOpts = {};
  let circlesOpts = {};
  let imagesOpts = {};
  let withDrawerOpts = {};
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
    const types = ['line', 'circles', 'drawer', 'images'];
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
          case 'line':
            drawer = (p0, p1) => {
              draw.line(p0, p1, lineOpts)
            };
            activateDrawType('line');
            break;
          case 'circles':
            drawer = (p0, p1) => {
              draw.circles(p0, p1, circlesOpts)
            };
            activateDrawType('circles');
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
  // TODO: cleanup: set initial values at js instead of html.
  // lineOpts:
  document.querySelector('#line_width').addEventListener(
    'change', (evt) => {
      lineOpts.width = parseInt(evt.target.value);
    });
  document.querySelector('#line_color').addEventListener(
    'change', (evt) => {
      lineOpts.color = evt.target.value;
    });
  document.querySelector('#line_dash').addEventListener(
    'change', (evt) => {
      lineOpts.lineDash = evt.target.value.split(',').map(s => parseInt(s));
    });
  // circlesOpts:
  document.querySelector('#circles_radius').addEventListener(
    'change', (evt) => {
      circlesOpts.radius = parseInt(evt.target.value);
    });
  document.querySelector('#circles_min_interval').addEventListener(
    'change', (evt) => {
      circlesOpts.minInterval = parseInt(evt.target.value);
    });
  document.querySelector('#circles_stroke_color').addEventListener(
    'change', (evt) => {
      circlesOpts.strokeColor = evt.target.value;
    });
  document.querySelector('#circles_stroke_width').addEventListener(
    'change', (evt) => {
      circlesOpts.strokeWidth = parseInt(evt.target.value);
    });
  document.querySelector('#circles_fill_color').addEventListener(
    'change', (evt) => {
      circlesOpts.fillColor = evt.target.value;
    });
  // imagesOpts:
  document.querySelector('#images_width').addEventListener(
    'change', (evt) => {
      imagesOpts.width = evt.target.value ?
        parseInt(evt.target.value) : 'auto';
    });
  document.querySelector('#images_height').addEventListener(
    'change', (evt) => {
      imagesOpts.height = evt.target.value ?
        parseInt(evt.target.value) : 'auto';
    });
  document.querySelector('#images_min_interval').addEventListener(
    'change', (evt) => {
      imagesOpts.minInterval = parseInt(evt.target.value);
    });
  document.querySelector('#images_border_color').addEventListener(
    'change', (evt) => {
      imagesOpts.borderColor = evt.target.value;
    });
  document.querySelector('#images_border_width').addEventListener(
    'change', (evt) => {
      imagesOpts.borderWidth = parseInt(evt.target.value);
    });
  // drawer:
  document.querySelector('#drawer_min_interval').addEventListener(
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

},{"drawbetween":2}],2:[function(require,module,exports){
// drawbetween/index.js
// TODO:
// - add types (typescript)
// - lint
// - add 'rotate' to opts

// DrawBetween:
class DrawBetween {
  constructor(elem) {
    const cv = DrawBetween.appendCanvas(elem);
    this.ctx = cv.getContext('2d');
  }

  // appendCanvas()
  static appendCanvas(elem) {
    const cv = document.createElement('canvas');
    const resizeCv = (() => {
      cv.width = elem.clientWidth;
      cv.height = elem.clientHeight;
    });
    cv.style.pointerEvents = 'none';
    resizeCv();
    // make canvas responsive:
    // TODO: actually it is not enough to just listen to
    //       window.resize event. We should listen to
    //       the parent element's resize event...
    //       Use 'ResizeObserver' ? (available only in Chrome).
    window.addEventListener('resize', resizeCv);
    elem.appendChild(cv);
    return cv;
  }

  // getPointsBetween()
  //  return points between (p0, p1) with specified intervals.
  static getPointsBetween(p0, p1, minInterval) {
    // len: length of (p0->p1)
    const len = Math.sqrt(
      Math.pow((p0.x - p1.x), 2) + Math.pow((p0.y - p1.y), 2));
    // n: number of points
    if (minInterval < 1) { return []; }
    const _n = Math.floor(len / minInterval);
    const remainder = len - (_n * minInterval);
    const n = _n + 1;
    // interval:
    const interval = minInterval + remainder / n;
    // dx, dy: amount of change on X and Y to l on the Line(y=mx).
    const l = interval;
    let dx;
    let dy;
    if (p0.x === p1.x) {
      // line(p0->p1): x = C
      dx = 0;
      dy = l;
      if (p1.y < p0.y) {
        dy = -dy;
      }
    } else {
      // line(p0->p1): y = mx
      const m = (p0.y - p1.y) / (p0.x - p1.x);
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
    const points = []
    for (let i = 0; i < n; i++) {
      points.push({
        x: Math.floor(p0.x + dx * i),
        y: Math.floor(p0.y + dy * i)
      });
    }
    return points;
  }

  // getPointsFor()
  //   return points for drawing objects (width, height)
  //   at the specified intervals.
  static getPointsFor(p0, p1, width, height, minInterval = 0) {
    // len: object's length on line(p0->p1);
    let len;
    if (p0.x === p1.x) {
      // y = C
      len = height;
    } else if (p0.y === p1.y) {
      // x = C
      len = width;
    } else {
      // line(p0->p1): y = mx
      const m = (p0.y - p1.y) / (p0.x - p1.x);
      if ((Math.abs(m) * width) < height) {
        len = Math.sqrt(
          Math.pow(width, 2) + Math.pow(m * width, 2));
      } else {
        len = Math.sqrt(
          Math.pow(height / m, 2) + Math.pow(height, 2));
      }
    }
    return DrawBetween.getPointsBetween(p0, p1, len + minInterval);
  }

  // clear()
  clear() {
    const cv = this.ctx.canvas;
    this.ctx.clearRect(0, 0, cv.width, cv.height);
  }

  // images()
  images(p0, p1, imageUrl, options) {
    const defaultOptions = {
      width: -1,
      height: -1,
      minInterval: 0,
      borderColor: '#000',
      borderWidth: 0
    };
    const opts = Object.assign(defaultOptions, options);
    const minInterval = opts.minInterval;
    if (opts.borderWidth) {
      this.ctx.lineWidth = opts.borderWidth;
      this.ctx.strokeStyle = opts.borderColor;
    }
    const doit = (img) => {
      const width = opts.width < 0 ? img.width : opts.width;
      const height = opts.height < 0 ? img.height : opts.height;
      const m = (p0.y - p1.y) / (p0.x - p1.x);
      const l = Math.sqrt(Math.pow(width, 2) + Math.pow(m * width, 2));
      const dx = Math.sqrt(Math.pow(l, 2) / (Math.pow(m, 2) + 1));
      const dy = m * dx;
      DrawBetween.getPointsFor(
        p0, p1, width, height, minInterval).forEach((p) => {
        let x = p.x;
        let y = p.y;
        let w = width;
        let h = height;
        if (opts.borderWidth) {
          this.ctx.beginPath();
          this.ctx.rect(x, y, w, h);
          this.ctx.stroke();
          if (opts.borderWidth) {
            x = x + opts.borderWidth;
            y = y + opts.borderWidth;
            w = w - opts.borderWidth * 2;
            h = h - opts.borderWidth * 2;
          } else {
            x = x + 1;
            y = y + 1;
            w = w - 2;
            h = h - 2;
          }
        }
        this.ctx.drawImage(img, x, y, w, h);
      });
    };
    const img = new Image();
    img.onload = () => {
      doit(img);
    }
    img.src = imageUrl;
  }

  // line()
  line(p0, p1, options) {
    const defaultOptions = {
      width: 1,
      color: '#000000',
      lineDash: [0,0]
    }
    const opts = Object.assign(defaultOptions, options);
    this.ctx.beginPath();
    this.ctx.lineWidth = opts.width;
    this.ctx.strokeStyle = opts.color;
    this.ctx.setLineDash(opts.lineDash);
    this.ctx.moveTo(p0.x, p0.y);
    this.ctx.lineTo(p1.x, p1.y);
    this.ctx.stroke();
  }

  // circles()
  circles(p0, p1, options) {
    const defaultOptions = {
      radius: 10,
      minInterval: 0,
      strokeColor: '#000',
      strokeWidth: 1,
      fillColor: ''
    };
    const opts = Object.assign(defaultOptions, options);
    const radius = opts.radius;
    const minInterval = opts.minInterval;
    if (opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor) {
      this.ctx.fillStyle = opts.fillColor;
    }
    DrawBetween.getPointsFor(
      p0, p1, radius * 2, radius * 2, minInterval).forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      if (opts.strokeWidth) {
        this.ctx.stroke();
      }
      if (opts.fillColor) {
        this.ctx.fill();
      }
    });
  }

  // rects()
  rects(p0, p1, options) {
    const defaultOptions = {
      width: 20,
      height: 20,
      minInterval: 0,
      strokeColor: '#000',
      strokeWidth: 1,
      fillColor: ''
    };
    const opts = Object.assign(defaultOptions, options);
    const width = opts.width;
    const height = opts.height;
    const minInterval = opts.minInterval;
    if (opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor) {
      this.ctx.fillStyle = opts.fillColor;
    }
    DrawBetween.getPointsFor(
      p0, p1, width, height, minInterval).forEach((p) => {
      this.ctx.beginPath();
      this.ctx.rect(p.x, p.y, width, height);
      if (opts.fillColor) {
        this.ctx.fill();
      }
      if (opts.strokeWidth) {
        this.ctx.stroke();
      }
    });
  }

  // triangles()
  triangles(p0, p1, options) {
    const defaultOptions = {
      edgeLength: 20,
      minInterval: 0,
      strokeColor: '#000',
      strokeWidth: 1,
      fillColor: ''
    };
    const opts = Object.assign(defaultOptions, options);
    const edgeLength = opts.edgeLength;
    const dx = Math.floor(edgeLength / 2);
    const dy = Math.floor(edgeLength * Math.sqrt(3) / 2);
    const minInterval = opts.minInterval;
    if (opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor) {
      this.ctx.fillStyle = opts.fillColor;
    }
    DrawBetween.getPointsFor(
      p0, p1, edgeLength, edgeLength, minInterval).forEach((p) => {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      // bottom-left
      this.ctx.lineTo(p.x - dx, p.y + dy);
      // bottom-right
      this.ctx.lineTo(p.x + dx, p.y + dy);
      // top
      this.ctx.lineTo(p.x, p.y);
      if (opts.fillColor) {
        this.ctx.fill();
      }
      if (opts.strokeWidth) {
        this.ctx.stroke();
      }
    });
  }

  // crossMarks()
  crossMarks(p0, p1, options) {
    const defaultOptions = {
      lineLength: 20,
      minInterval: 0,
      strokeColor: '#000',
      strokeWidth: 1
    };
    const opts = Object.assign(defaultOptions, options);
    const lineLength = opts.lineLength;
    const d = Math.floor(lineLength / (2 * Math.sqrt(2)));
    const size = Math.floor(lineLength / Math.sqrt(2));
    const minInterval = opts.minInterval;
    if (opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    DrawBetween.getPointsFor(
      p0, p1, size, size, minInterval).forEach((p) => {
      this.ctx.beginPath();
      // upper-left
      this.ctx.moveTo(p.x - d, p.y - d);
      // bottom-right
      this.ctx.lineTo(p.x + d, p.y + d);
      // upper-right
      this.ctx.moveTo(p.x + d, p.y - d);
      // bottom-left
      this.ctx.lineTo(p.x - d, p.y + d);
      if (opts.strokeWidth) {
        this.ctx.stroke();
      }
    });
  }

  // withDrawer()
  withDrawer(p0, p1, drawer, options) {
    const defaultOptions = {
      minInterval: 20
    };
    const opts = Object.assign(defaultOptions, options);
    const minInterval = opts.minInterval;
    DrawBetween.getPointsFor(
      p0, p1, 0, 0, minInterval).forEach((p) => {
      drawer(this.ctx, p);
    });
  }
}

// module.exports (for Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DrawBetween;
}

},{}]},{},[1]);
