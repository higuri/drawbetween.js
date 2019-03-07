// esm/main.ts

import DrawBetween from '../../../dist/drawbetween_esm.js';

// main()
function main(): void {
  const canvas = document.querySelector('#canvas');
  const draw = new DrawBetween(canvas);
  draw.rects({x: 1, y: 1}, {x: 279, y: 279});
}

document.addEventListener('DOMContentLoaded', () => main());
