// drawbetween/index.js
// TODO: comment

// DrawBetween:
class DrawBetween {
  constructor(sel) {
    // TODO: error handling.
    const elem = document.querySelector(sel);
    const cv = DrawBetween.appendCanvas(elem);
    this.ctx = cv.getContext('2d');
  }

  // appendCanvas()
  static appendCanvas(elem) {
    const width = elem.clientWidth;
    const height = elem.clientHeight;
    const cv = document.createElement('canvas');
    cv.width = width;
    cv.height = height;
    elem.appendChild(cv);
    return cv;
  }

  // drawBetween()
  drawBetween(p0, p1, width, height, margin, drawer) {
    // y = mx
    const m = (p0.y - p1.y) / (p0.x - p1.x);
    let l;
    if (m * width < height) {
      l = Math.sqrt(Math.pow(width, 2) + Math.pow(m * width, 2)) + margin;
    } else {
      l = Math.sqrt(Math.pow((1 / m) * height, 2) + Math.pow(height, 2)) + margin;
    }
    const dx = Math.sqrt(Math.pow(l, 2) / (Math.pow(m, 2) + 1));
    const dy = m * dx;
    const mid = {
      x: Math.floor((p0.x + p1.x) / 2),
      y: Math.floor((p0.y + p1.y) / 2)
    };
    console.log(`m=${m}, l=${l}, dx=${dx}, dy=${dy}`);
    if (Number.isNaN(dx) || Number.isNaN(dy)) {
      return;
    }
    //
    let i = 0;
    while (true) {
      // right:
      const q0 = {
        x: Math.floor(mid.x + dx * i),
        y: Math.floor(mid.y + dy * i)
      };
      // left:
      const q1 = {
        x: Math.floor(mid.x - dx * i),
        y: Math.floor(mid.y - dy * i)
      };
      // vector(p0->q0++):
      const v0 = {
        x: (q0.x + dx) - p0.x,
        y: (q0.y + dy) - p0.y,
      };
      // vector(p1->q0++):
      const v1 = {
        x: (q0.x + dx) - p1.x,
        y: (q0.y + dy) - p1.y,
      };
      const ip = v0.x * v1.x + v0.y * v1.y;
      const vl0 = Math.sqrt(
        Math.pow(v0.x, 2) + Math.pow(v0.y, 2));
      const vl1 = Math.sqrt(
        Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
      const cos = ip / (vl0 * vl1);
      if (0 < cos) {
        drawer(p0);
        drawer(p1);
        break;
      } else {
        drawer(q0);
        if (q0.x !== q1.x && q0.y !== q1.y) {
          drawer(q1);
        }
      }
      i += 1;
    }
  }

  // clear()
  clear() {
    const cv = this.ctx.canvas;
    this.ctx.clearRect(0, 0, cv.width, cv.height);
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
      margin: 0,
      strokeColor: '#000',
      strokeWidth: 1,
      fillColor: ''
    };
    const opts = Object.assign(defaultOptions, options);
    const radius = opts.radius;
    const margin = opts.margin;
    if (opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor) {
      this.ctx.fillStyle = opts.fillColor;
    }
    const drawCircle = (p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      if (opts.strokeWidth) {
        this.ctx.stroke();
      }
      if (opts.fillColor) {
        this.ctx.fill();
      }
    }
    this.drawBetween(p0, p1, radius * 2, radius * 2, margin, drawCircle);
  }

  // rects()
  rects(p0, p1, options) {
    const defaultOptions = {
      width: 20,
      height: 20,
      margin: 0,
      strokeColor: '#000',
      strokeWidth: 1,
      fillColor: ''
    };
    const opts = Object.assign(defaultOptions, options);
    const width = opts.width;
    const height = opts.height;
    const margin = opts.margin;
    if (opts.strokeWidth) {
      this.ctx.strokeStyle = opts.strokeWidth;
      this.ctx.lineWidth = opts.strokeWidth;
    }
    if (opts.fillColor) {
      this.ctx.fillStyle = opts.fillColor;
    }
    const drawRect = (p) => {
      this.ctx.beginPath();
      this.ctx.rect(p.x, p.y, width, height);
      if (opts.fillColor) {
        this.ctx.fill();
      }
      if (opts.strokeWidth) {
        this.ctx.stroke();
      }
    }
    this.drawBetween(p0, p1, width, height, margin, drawRect);
  }

  // images()
  // TODO: anchor-pos (sx, sy)
  images(p0, p1, imgurl, options) {
    const defaultOptions = {
      width: 'auto',
      height: 'auto',
      margin: 0,
      borderColor: '#000',
      borderWidth: 0
    };
    const opts = Object.assign(defaultOptions, options);
    const margin = opts.margin;
    if (opts.borderWidth) {
      this.ctx.lineWidth = opts.borderWidth;
      this.ctx.strokeStyle = opts.borderColor;
    }
    const doit = (img) => {
      const width = img.width;
      const height = img.height;
      const m = (p0.y - p1.y) / (p0.x - p1.x);
      const l = Math.sqrt(Math.pow(width, 2) + Math.pow(m * width, 2));
      const dx = Math.sqrt(Math.pow(l, 2) / (Math.pow(m, 2) + 1));
      const dy = m * dx;
      const mid = {
        x: Math.floor((p0.x + p1.x) / 2),
        y: Math.floor((p0.y + p1.y) / 2)
      };
      const drawImage = (p) => {
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
      }
      this.drawBetween(p0, p1, width, height, 0, drawImage);
    };
    const img = new Image();
    img.onload = () => {
      doit(img);
    }
    img.src = imgurl;
  }
}
