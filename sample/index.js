// sample/index.js

// main()
function main() {
  let p0;
  let fixed = false;
  const root = document.querySelector('#root');
  const draw = new DrawBetween('#root');
  root.addEventListener('click', (evt) => {
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
  root.addEventListener('mousemove', (evt) => {
    if (p0 && !fixed) {
      p1 = {
        x: evt.offsetX,
        y: evt.offsetY
      };
      draw.clear();
      draw.rects(p0, p1);
    }
  });
  root.addEventListener('mouseout', (evt) => {
    fixed = true;
  });
}

document.addEventListener('DOMContentLoaded', () => main());
