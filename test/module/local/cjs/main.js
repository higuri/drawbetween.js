// cjs/main.js

const DrawBetween = require('drawbetween');

// main()
function main() {
  const canvas = document.querySelector('#canvas');
  const draw = new DrawBetween(canvas);
  draw.rects(
    {x: 1, y: 1},
    {x: 279, y: 279},
    {minInterval: 10, strokeColor: '#f00'}
  );
}

document.addEventListener('DOMContentLoaded', () => main());
