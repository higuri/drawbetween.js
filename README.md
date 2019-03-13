# drawbetween.js
A JavaScript library for drawing images and shapes on the specified line segment.

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

![](https://raw.githubusercontent.com/higuri/drawbetween.js/gh-pages/images/screenshot.gif)

## Demo
https://higuri.github.io/drawbetween.js/sample/

## Installation
### via NPM
```sh
npm install drawbetween
# or...
yarn add drawbetween
```

#### CommonJS
```js
const DrawBetween = require('drawbetween');
```
#### ES Module
```js
import DrawBetween from 'drawbetween';
```

### via CDN
```html
<script scr="https://unpkg.com/drawbetween"></script>
```

## Usage Example

### HTML
```html
<div id="canvas" style="width:300px; height:150px"></div>
```

### JavaScript
```js
const canvas = document.querySelector('#canvas');
const draw = new DrawBetween(canvas);

// draw images between (0,0) and (250,0).
const imageUrl = 'YOUR_IMAGE_URL';
draw.images({x: 0, y: 0}, {x: 250, y: 0}, imageUrl);

// draw rects with default options.
draw.rects({x: 0, y: 40}, {x: 250, y: 40});

// draw cross marks with custom options.
draw.crossMarks({x: 10, y: 80}, {x: 260, y: 80}, {
  minInterval: 40,
  strokeColor: '#f00',
  strokeWidth: 3
});

// draw custom paths.
const drawer = (ctx, p) => {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#0af';
  ctx.fill();
};
draw.withDrawer({x: 10, y: 110}, {x: 260, y: 110}, drawer, {
  minInterval: 35
});
```

### CodePen
https://codepen.io/higuri/pen/jJNNmB

## API
### new `DrawBetween(targetDiv)`
Create a new DrawBetween object.
* `targetDiv`: Element - a reference to &lt;div&gt; to be drawn.

### `line(p0, p1, options)`
Draw a straight line between p0 and p1.
* `p0`: {x: number, y: number} - a start point of line.
* `p1`: {x: number, y: number} - an end point of line.
* `options`:
  * `width`: number - line width.
    <default: 1>
  * `color`: string - line color.
    <default: '#000'>
  * `lineDash`: number[] - distances to alternately draw a line and a gap.
    See [CanvasRenderingContext2D.setLineDash()][mdn-linedash] for details.
    <default: [0, 0]>
    
### `images(p0, p1, imageUrl, options)`
Draw images on the specified line segment.
* `p0`: {x: number, y: number} - a start point of the line segment.
* `p1`: {x: number, y: number} - an end point of the line segment.
* `imageUrl`: string - a full URL of image to draw.
* `options`:
  * `width`: number - image width.
    -1 means the original width of image.
    <default: -1>
  * `height`: number - image height.
    -1 means original height of image.
    <default: -1>
  * `minInterval`: number - minimum spacing between adjacent images.
    <default: 0>
  * `borderColor`: string - border color of image.
    <default: '#000'>
  * `borderWidth`: number - border width of image.
    <default: 0>

### `rects(p0, p1, options)`
Draw rectangles on the specified line segment.
* `p0`: {x: number, y: number} - a start point of the line segment.
* `p1`: {x: number, y: number} - an end point of the line segment.
* `options`:
  * `width`: number - rectangle width.
    <default: 20>
  * `height`: number - rectangle height.
    <default: 20>
  * `minInterval`: number - minimum spacing between adjacent rectangles.
    <default: 0>
  * `strokeColor`: string - stroke color of rectangle.
    <default: '#000'>
  * `strokeWidth`: number - stroke width of rectangle.
    <default: 0>
  * `fillColor`: string - fill color of rectangle.
    <default: '#000'>

### `circles(p0, p1, options)`
Draw circles on the specified line segment.
* `p0`: {x: number, y: number} - a start point of the line segment.
* `p1`: {x: number, y: number} - an end point of the line segment.
* `options`:
  * `radius`: number - circle radius.
    <default: 10>
  * `minInterval`: number - minimum spacing between adjacent circles.
    <default: 0>
  * `strokeColor`: string - stroke color of circle.
    <default: '#000'>
  * `strokeWidth`: number - stroke width of circle.
    <default: 0>
  * `fillColor`: string - fill color of circle.
    <default: '#000'>

### `crossMarks(p0, p1, options)`
Draw cross marks on the specified line segment.
* `p0`: {x: number, y: number} - a start point of the line segment.
* `p1`: {x: number, y: number} - an end point of the line segment.
* `options`:
  * `lineLength`: number - line length of cross mark.
    <default: 20>
  * `minInterval`: number - minimum spacing between adjacent cross marks.
    <default: 0>
  * `strokeColor`: string - stroke color of cross mark.
    <default: '#000'>
  * `strokeWidth`: number - stroke width of cross mark.
    <default: 0>

### `triangles(p0, p1, options)`
Draw triangles on the specified line segment.
* `p0`: {x: number, y: number} - a start point of the line segment.
* `p1`: {x: number, y: number} - an end point of the line segment.
* `options`:
  * `edgeLength`: number - edge length of triangle.
    <default: 20>
  * `minInterval`: number - minimum spacing between adjacent triangles.
    <default: 0>
  * `strokeColor`: string - stroke color of triangle.
    <default: '#000'>
  * `strokeWidth`: number - stroke width of triangle.
    <default: 0>
  * `fillColor`: string - fill color of triangle.
    <default: '#000'>

### `withDrawer(p0, p1, drawer, options)`
Draw specified paths on the specified line segment. 
* `p0`: {x: number, y: number} - a start point of the line segment.
* `p1`: {x: number, y: number} - an end point of the line segment.
* `drawer`: ((ctx: CanvasRenderingContext2D, p: {x: number, y: number}) => void) - drawing function.
* `option`:
  * `minInterval`: number - minimum spacing between adjacent paths.
    <default: 0>

### `clear()`
Clear all drawings of the instance.

## License
This project is licensed under the MIT License - see the [LICENSE.md][lic-url] file for details.

<!-- Markdown link -->
[npm-image]: https://img.shields.io/npm/v/drawbetween.svg?style=flat-square
[npm-url]: https://npmjs.org/package/drawbetween
[npm-downloads]: https://img.shields.io/npm/dm/drawbetween.svg?style=flat-square
[mdn-linedash]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash#Parameters
[lic-url]: https://raw.githubusercontent.com/higuri/drawbetween.js/master/LICENSE
