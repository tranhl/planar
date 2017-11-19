'use strict';

/**
 * Constructs a Planar with three members: width, height, and grid.
 * 
 * width and height provide the width and height of the Planar respectively.
 * grid holds the 2d array that the Planar wraps around.
 * 
 * All three members should NOT be mutated directly, as methods depend on their values in relation
 * to each other; doing so will produce unexpected results when calling any methods.
 * 
 * @param {any} grid 
 * @returns A Planar object instance.
 */
let Planar = function (grid) {
    if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
        return new Error(`Argument is not an array of arrays`);
    }

    if (!isRectangular(grid)) {
        return new Error('Argument does not have a consistent width');
    }

    for (let rowNum = 0; rowNum < grid.length; rowNum++) {
        this[rowNum] = grid[rowNum];
    }
    
    this.width = grid[0].length;
    this.height = grid.length;
    this.grid = grid;
};

/** 
 * Get the value of a cell.
 * 
 * @param {any} row
 * @param {any} col
 * @returns The value of the cell, or an Error object if indices are out of bounds.
 */
Planar.prototype.get = function (row, col) {
    try {
        return this.grid[row][col];
    } catch (err) {
        return new Error(`Out of bounds cell access in row ${row} col ${col}`);
    }
}

/**
 * Sets the value of a cell.
 * 
 * @param {any} row 
 * @param {any} col 
 * @param {any} value The new value of the specified cell.
 * @returns An Error object if the indicies are out of bounds, otherwise null.
 */
Planar.prototype.set = function (row, col, value) {
    try {
        this.grid[row][col] = this[row][col] = value;
    } catch (err) {
        return new Error(`Out of bounds cell mutation in row ${row} col ${col} for value ${value}`);
    }
}

/**
 * Get the dimensions of the Planar as an array of the format [width, height].
 * 
 * @returns The array holding the dimensions of the Planar.
 */
Planar.prototype.dimen = function () {
    return [this.width, this.height];
}

/**
 * Get the area of the Planar.
 * 
 * @returns An integer representing the area of the Planar.
 */
Planar.prototype.area = function () {
    return this.width * this.height;
}

/**
 * Determines whether the supplied grid is rectangular or not.
 * Assumes that the grid contains at least one internal array.
 * 
 * @param {any} grid 
 * @returns True if rectangular, false if not.
 */
function isRectangular(grid) {
    let width = grid[0].length;

    for (let rowNum = 0; rowNum < grid.length; rowNum++) {
        if (grid[rowNum].length !== width) {
            return false;
        }
    }

    return true;
}

module.exports = Planar;