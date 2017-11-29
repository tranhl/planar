# Planar

> A wrapper object for 2d arrays that provides a plethora of useful methods.

Inspired by [Array2d.js](https://github.com/matthewtoast/Array2D.js), this package provides method syntax in order to manipulate 2d arrays, rather than having to call methods from a global object and pass in the 2d array every method call.

## Installation

```bash
npm install planar --save
```

## Usage

### Basics

To use Planar, simply call the Planar constructor and pass in a 2d array:

```js
const Planar = require('planar'); // Require the Planar package

let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let planar = new Planar(grid); // Instantiate a Planar object, passing a 2d array as the argument
console.log(planar.area()); // 9
```

To access cell values, use either the provided `get()` method or array syntax (`planar[row][col]`):

```js
let planar = new Planar([
    [1, 2],
    [3, 4]
]);
console.log(planar.get(1, 1)); // 1
console.log(planar[1][1]); // 1
```

Naturally, this applies for the `set()` method as well:

```js
planar.set(1, 1, 'a');
console.log(planar.get(1, 1)); // 'a'

planar[1][1] = 'b';
console.log(planar[1][1]); // 'b'
```

### Usage Constraints

To create a Planar object, you must pass in a rectangular 2d array. When attempting to construct a Planar object with an invalid argument, an Error object will be returned instead of a Planar instance:

```js
let grid1 = [1];
let planar1 = new Planar(grid1);
console.log(instanceof planar1); // Error (not a 2d array)

let grid2 = [
    [1, 2, 3],
    [4, 5, 6, 7]
];
let planar2 = new Planar(grid2);
console.log(instanceof planar2) // Error (not rectangular)

let grid3 = [[]];
let planar3 = new Planar(grid2);
console.log(instanceof planar2); // Planar
```

## Documentation

The following list provides basic details on what methods are provided by the Planar package. For full documentation, click [here](https://github.com/tranhl/planar/wiki).

### Basic methods

`get(row, col)` - Get the value of a cell.

`set(row, col)` - Sets the value of a cell.

`grid()` - Get the internal 2d array of the Planar.

`dimen()` - Get the dimensions of the Planar as an array of the format [width, height].

`area()` - Get the area of the Planar.

## License
[MIT](http://vjpr.mit-license.org)
