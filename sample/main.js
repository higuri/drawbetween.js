// main.js

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
