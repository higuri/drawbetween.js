# drawbetween.js
A JavaScript library for drawing images and shapes on the specified line segment.

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

![](https://raw.githubusercontent.com/higuri/drawbetween.js/gh-pages/images/screenshot.gif)

## Demo
https://higuri.github.io/drawbetween.js/sample/index.html

## Installation
```sh
yarn add drawbetween
# or...
npm install drawbetween
```

## Usage Example
### HTML
```html
<div id="canvas" style="width:100px; height:100px"></div>
```

### JavaScript
```js
const DrawBetween = require('drawbetween');

const canvas = document.querySelector('#canvas');
const draw = new DrawBetween(canvas);
draw.circles({x: 25, y: 25}, {x: 75, y: 75});
```

## DrawBetween class API
### Constructor
#### `DrawBetween(targetDiv)`
##### targetDiv
A reference to an Element to be drawn.

### Methods
TODO
#### `line(p0, p1, options)`
#### `rects(p0, p1, options)`
#### `circles(p0, p1, options)`
#### `images(p0, p1, imgurl, options)`
#### `clear()`

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

<!-- Markdown link -->
[npm-image]: https://img.shields.io/npm/v/drawbetween.svg?style=flat-square
[npm-url]: https://npmjs.org/package/drawbetween
[npm-downloads]: https://img.shields.io/npm/dm/drawbetween.svg?style=flat-square
