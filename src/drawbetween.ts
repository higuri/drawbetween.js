// drawbetween/index.js

//
// Type definitions for parameters.
//

// Point
export interface Point {
  x: number;
  y: number;
}

// Drawer
export type Drawer = (ctx: CanvasRenderingContext2D, p: Point) => void;

// ImagesOptions
export interface ImagesOptions {
  width?: number;
  height?: number;
  minInterval?: number;
  borderColor?: string;
  borderWidth?: number;
}
class _ImagesOptions implements ImagesOptions {
  public width: number = -1;
  public height: number = -1;
  public minInterval: number = 0;
  public borderColor: string = "#000";
  public borderWidth: number = 0;
}
// LineOptions
export interface LineOptions {
  width?: number;
  color?: string;
  lineDash?: number[];
}
class _LineOptions implements LineOptions {
  public width: number = 1;
  public color: string = "#000000";
  public lineDash: number[] = [0, 0];
}
// RectsOptions
export interface RectsOptions {
  width?: number;
  height?: number;
  minInterval?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
}
class _RectsOptions implements RectsOptions {
  width: number = 20;
  height: number = 20;
  minInterval: number = 0;
  strokeColor: string = "#000";
  strokeWidth: number = 1;
  fillColor: string = "";
}
// CirclesOptions
export interface CirclesOptions {
  radius?: number;
  minInterval?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
}
class _CirclesOptions implements CirclesOptions {
  radius: number = 10;
  minInterval: number = 0;
  strokeColor: string = "#000";
  strokeWidth: number = 1;
  fillColor: string = "";
}
// TrianglesOptions
export interface TrianglesOptions {
  edgeLength?: number;
  minInterval?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
}
class _TrianglesOptions implements TrianglesOptions {
  edgeLength: number = 20;
  minInterval: number = 0;
  strokeColor: string = "#000";
  strokeWidth: number = 1;
  fillColor: string = "";
}
// CrossMarksOptions
export interface CrossMarksOptions {
  lineLength?: number;
  minInterval?: number;
  strokeColor?: string;
  strokeWidth?: number;
}
class _CrossMarksOptions implements CrossMarksOptions {
  lineLength: number = 20;
  minInterval: number = 0;
  strokeColor: string = "#000";
  strokeWidth: number = 1;
}
// WithDrawerOptions
export interface WithDrawerOptions {
  minInterval?: number;
}
class _WithDrawerOptions implements WithDrawerOptions {
  public minInterval: number = 20;
}

//
// DrawBetween
//
export default class DrawBetween {
  // ctx:
  private ctx: CanvasRenderingContext2D;

  constructor(elem: HTMLElement) {
    const cv = DrawBetween.appendCanvas(elem);
    this.ctx = cv.getContext("2d")!;
  }

  // appendCanvas()
  static appendCanvas(elem: HTMLElement): HTMLCanvasElement {
    const cv = document.createElement("canvas");
    const resizeCv = () => {
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
  }

  // getPointsBetween()
  //  return points between (p0, p1) with specified intervals.
  static getPointsBetween(p0: Point, p1: Point, minInterval: number): Point[] {
    // len: length of (p0->p1)
    const len = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
    // n: number of points
    if (minInterval < 1) {
      return [];
    }
    const _n = Math.floor(len / minInterval);
    const remainder = len - _n * minInterval;
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
    const points = [];
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
  static getPointsFor(
    p0: Point,
    p1: Point,
    width: number,
    height: number,
    minInterval: number = 0
  ): Point[] {
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
      if (Math.abs(m) * width < height) {
        len = Math.sqrt(Math.pow(width, 2) + Math.pow(m * width, 2));
      } else {
        len = Math.sqrt(Math.pow(height / m, 2) + Math.pow(height, 2));
      }
    }
    return DrawBetween.getPointsBetween(p0, p1, len + minInterval);
  }

  // clear()
  clear(): void {
    const cv = this.ctx.canvas;
    this.ctx.clearRect(0, 0, cv.width, cv.height);
  }

  // images()
  images(
    p0: Point,
    p1: Point,
    imageUrl: string,
    options?: ImagesOptions
  ): void {
    const defaultOptions = new _ImagesOptions();
    const opts = Object.assign(defaultOptions, options);
    const minInterval = opts.minInterval;
    if (0 < opts.borderWidth) {
      this.ctx.lineWidth = opts.borderWidth;
      this.ctx.strokeStyle = opts.borderColor;
    }
    const doit = (img: HTMLImageElement) => {
      const width = opts.width < 0 ? img.width : opts.width;
      const height = opts.height < 0 ? img.height : opts.height;
      DrawBetween.getPointsFor(p0, p1, width, height, minInterval).forEach(
        p => {
          let x = p.x;
          let y = p.y;
          let w = width;
          let h = height;
          if (0 < opts.borderWidth) {
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.stroke();
            x += opts.borderWidth;
            y += opts.borderWidth;
            w -= opts.borderWidth * 2;
            h -= opts.borderWidth * 2;
          }
          this.ctx.drawImage(img, x, y, w, h);
        }
      );
    };
    const img = new Image();
    img.onload = () => {
      doit(img);
    };
    img.src = imageUrl;
  }

  // line()
  line(p0: Point, p1: Point, options?: LineOptions): void {
    const defaultOptions = new _LineOptions();
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
  circles(p0: Point, p1: Point, options?: CirclesOptions): void {
    const defaultOptions = new _CirclesOptions();
    const opts = Object.assign(defaultOptions, options);
    const radius = opts.radius;
    const minInterval = opts.minInterval;
    if (0 < opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor != '') {
      this.ctx.fillStyle = opts.fillColor;
    }
    DrawBetween.getPointsFor(
      p0,
      p1,
      radius * 2,
      radius * 2,
      minInterval
    ).forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      if (0 < opts.strokeWidth) {
        this.ctx.stroke();
      }
      if (opts.fillColor !== '') {
        this.ctx.fill();
      }
    });
  }

  // rects()
  rects(p0: Point, p1: Point, options?: RectsOptions): void {
    const defaultOptions = new _RectsOptions();
    const opts = Object.assign(defaultOptions, options);
    const width = opts.width;
    const height = opts.height;
    const minInterval = opts.minInterval;
    if (0 < opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor !== '') {
      this.ctx.fillStyle = opts.fillColor;
    }
    DrawBetween.getPointsFor(p0, p1, width, height, minInterval).forEach(p => {
      this.ctx.beginPath();
      this.ctx.rect(p.x, p.y, width, height);
      if (0 < opts.strokeWidth) {
        this.ctx.stroke();
      }
      if (opts.fillColor !== '') {
        this.ctx.fill();
      }
    });
  }

  // triangles()
  triangles(p0: Point, p1: Point, options?: TrianglesOptions): void {
    const defaultOptions = new _TrianglesOptions();
    const opts = Object.assign(defaultOptions, options);
    const edgeLength = opts.edgeLength;
    const dx = Math.floor(edgeLength / 2);
    const dy = Math.floor((edgeLength * Math.sqrt(3)) / 2);
    const minInterval = opts.minInterval;
    if (0 < opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    if (opts.fillColor !== '') {
      this.ctx.fillStyle = opts.fillColor;
    }
    DrawBetween.getPointsFor(
      p0,
      p1,
      edgeLength,
      edgeLength,
      minInterval
    ).forEach(p => {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      // bottom-left
      this.ctx.lineTo(p.x - dx, p.y + dy);
      // bottom-right
      this.ctx.lineTo(p.x + dx, p.y + dy);
      // top
      this.ctx.lineTo(p.x, p.y);
      if (0 < opts.strokeWidth) {
        this.ctx.stroke();
      }
      if (opts.fillColor !== '') {
        this.ctx.fill();
      }
    });
  }

  // crossMarks()
  crossMarks(p0: Point, p1: Point, options?: CrossMarksOptions): void {
    const defaultOptions = new _CrossMarksOptions();
    const opts = Object.assign(defaultOptions, options);
    const lineLength = opts.lineLength;
    const d = Math.floor(lineLength / (2 * Math.sqrt(2)));
    const size = Math.floor(lineLength / Math.sqrt(2));
    const minInterval = opts.minInterval;
    if (0 < opts.strokeWidth) {
      this.ctx.lineWidth = opts.strokeWidth;
      this.ctx.strokeStyle = opts.strokeColor;
    }
    DrawBetween.getPointsFor(p0, p1, size, size, minInterval).forEach(p => {
      this.ctx.beginPath();
      // upper-left
      this.ctx.moveTo(p.x - d, p.y - d);
      // bottom-right
      this.ctx.lineTo(p.x + d, p.y + d);
      // upper-right
      this.ctx.moveTo(p.x + d, p.y - d);
      // bottom-left
      this.ctx.lineTo(p.x - d, p.y + d);
      if (0 < opts.strokeWidth) {
        this.ctx.stroke();
      }
    });
  }

  // withDrawer()
  withDrawer(
    p0: Point,
    p1: Point,
    drawer: Drawer,
    options?: WithDrawerOptions
  ): void {
    const defaultOptions = new _WithDrawerOptions();
    const opts = Object.assign(defaultOptions, options);
    const minInterval = opts.minInterval;
    DrawBetween.getPointsFor(p0, p1, 0, 0, minInterval).forEach(p => {
      drawer(this.ctx, p);
    });
  }
}
