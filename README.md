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

When instantiating a Planar object, only 2d arrays (grids) will be accepted. This means that at minimum, you must pass in an array within an array to the constructor. 

When attempting to construct a Planar object with an invalid argument, an Error object will be returned instead of a Planar instance:

```js
let grid1 = [1];
let planar1 = new Planar(grid1);
console.log(instanceof planar1); // Error

let grid2 = [[]];
let planar2 = new Planar(grid2);
console.log(instanceof planar2); // Planar
```

## Documentation

The following list provides basic details on what methods are provided by the Planar package. For full documentation, click [here](https://github.com/tranhl/planar/wiki).

### Basic methods

`get(row, col)` - Get the value of a cell.

`set(row, col)` - Sets the value of a cell.

`grid()` - Get the Planar's internal 2d array.

`dimen()` - Get the dimensions of the Planar as an array of the format [width, height].

`area()` - Get the area of the Planar.

## License
[MIT](http://vjpr.mit-license.org)
