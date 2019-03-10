// esm/main.ts

import DrawBetween from 'drawbetween';

// main()
function main(): void {
  const canvas = document.querySelector('#canvas') as HTMLElement
  const draw = new DrawBetween(canvas);
  draw.rects(
    {x: 1, y: 1},
    {x: 279, y: 279},
    {minInterval: 10, strokeColor: '#f00'}
  );
}

document.addEventListener('DOMContentLoaded', () => main());
