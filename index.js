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
    //       windows' resize event.
    //       we should listen to the parent element's resize event...
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
  images(p0, p1, imgurl, options) {
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
    img.src = imgurl;
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
}

// module.exports (for Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DrawBetween;
}
