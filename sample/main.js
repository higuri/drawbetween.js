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
    width: 1,
    color: "#000000",
    lineDash: [0, 0]
  };
  let trianglesOpts = {
    edgeLength: 20,
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 1,
    fillColor: ""
  };
  let crossMarksOpts = {
    lineLength: 20,
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 1
  };
  let rectsOpts = {
    width: 20,
    height: 20,
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 1,
    fillColor: ""
  };
  let circlesOpts = {
    radius: 10,
    minInterval: 0,
    strokeColor: "#000",
    strokeWidth: 1,
    fillColor: ""
  };
  let imagesOpts = {
    width: -1,
    height: -1,
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
  circlesStrokeWidthvalue = circlesOpts.strokeWidth;
  circlesStrokeWidth.addEventListener(
    'change', (evt) => {
      circlesOpts.strokeWidth = parseInt(evt.target.value);
    });
  const circlesFillColor = document.querySelector('#circles_fill_color');
  circlesFillColorvalue = circlesOpts.fillColor;
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
      rectsOpts.strokeColor = parseInt(evt.target.value);
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
      rectsOpts.fillColor = parseInt(evt.target.value);
    });
  // trianglesOpts:
  const trianglesEdgeLength = document.querySelector('#triangles_edge_length');
  trianglesEdgeLength.value = trianglesOpts.edgeLength;
  trianglesEdgeLength.addEventListener(
    'change', (evt) => {
      trianglesOpts.edgeLength = parseInt(evt.target.value);
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
      trianglesOpts.strokeColor = parseInt(evt.target.value);
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
      trianglesOpts.fillColor = parseInt(evt.target.value);
    });
  // crossMarksOpts:
  const crossMarksLineLength = document.querySelector('#cross_marks_line_length');
  crossMarksLineLength.value = crossMarksOpts.lineLength;
  crossMarksLineLength.addEventListener(
    'change', (evt) => {
      crossMarksOpts.lineLength = parseInt(evt.target.value);
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
      crossMarksOpts.strokeColor = parseInt(evt.target.value);
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
  const lineColor = document.querySelector('#line_color');
  lineColor.value = lineOpts.color;
  lineColor.addEventListener(
    'change', (evt) => {
      lineOpts.color = evt.target.value;
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
      imagesOpts.width = evt.target.value ?
        parseInt(evt.target.value) : 'auto';
    });
  const imagesHeight = document.querySelector('#images_height');
  imagesHeight.value = imagesOpts.height;
  imagesHeight.addEventListener(
    'change', (evt) => {
      imagesOpts.height = evt.target.value ?
        parseInt(evt.target.value) : 'auto';
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
