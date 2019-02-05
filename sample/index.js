// sample/index.js

// main()
function main() {
  let p0;
  let fixed = false;
  // drawbetween:
  const draw = new DrawBetween('#canvas');
  let lineOpts = {};
  let circlesOpts = {};
  let rectsOpts = {};
  let imagesOpts = {};
  // canvas:
  const canvas = document.querySelector('#canvas');
  let drawer = (p0, p1) => { draw.circles(p0, p1, circlesOpts) };
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
  // selector:
  const radios = document.querySelectorAll('.radio');
  for (let i = 0; i < radios.length; i++) {
    const radio = radios[i];
    radio.addEventListener('change', () => {
      if (radio.checked) {
        switch (radio.value) {
          case 'line':
            drawer = (p0, p1) => {
              draw.line(p0, p1, lineOpts)
            };
            break;
          case 'circles':
            drawer = (p0, p1) => {
              draw.circles(p0, p1, circlesOpts)
            };
            break;
          case 'rects':
            drawer = (p0, p1) => {
              draw.rects(p0, p1, rectsOpts)
            };
            break;
          case 'images':
            drawer = (p0, p1) => {
              draw.images(p0, p1, './image.png', imagesOpts)
            };
            break;
          default:
            break;
        }
      }
    });
  }
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
  // rectsOpts:
  document.querySelector('#rects_width').addEventListener(
    'change', (evt) => {
    rectsOpts.width = parseInt(evt.target.value);
  });
  document.querySelector('#rects_height').addEventListener(
    'change', (evt) => {
    rectsOpts.height = parseInt(evt.target.value);
  });
  document.querySelector('#rects_min_interval').addEventListener(
    'change', (evt) => {
    rectsOpts.minInterval = parseInt(evt.target.value);
  });
  document.querySelector('#rects_stroke_color').addEventListener(
    'change', (evt) => {
    rectsOpts.strokeColor = evt.target.value;
  });
  document.querySelector('#rects_stroke_width').addEventListener(
    'change', (evt) => {
    rectsOpts.strokeWidth = parseInt(evt.target.value);
  });
  document.querySelector('#rects_fill_color').addEventListener(
    'change', (evt) => {
    rectsOpts.fillColor = evt.target.value;
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
}

document.addEventListener('DOMContentLoaded', () => main());
