'use strict';

/*
    Basic functions
 */

/**
 * Constructs a Planar object.
 * 
 * @param {any} grid 
 * @returns A Planar object instance.
 */
let Planar = function (grid) {
    // 2d array check
    if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
        return new Error(`Argument is not a 2d array`);
    }

    // Rectaunglarity check 
    if (!isRectangular(grid)) {
        return new Error('Argument is not rectangular');
    }

    // Store 2d array as internal grid
    for (let rowNum = 0; rowNum < grid.length; rowNum++) {
        this[rowNum] = grid[rowNum];
    }
    
    this.width = grid[0].length;
    this.height = grid.length;
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
        return this[row][col];
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
        this[row][col] = value;
    } catch (err) {
        return new Error(`Out of bounds cell assignment in row ${row} col ${col} for value ${value}`);
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
 * Get the internal 2d array of the Planar.
 * 
 * @returns The Planar's internal 2d array.
 */
Planar.prototype.grid = function () {
    let output = [];

    for (let rowNum = 0; rowNum < this.height; rowNum++) {
        output.push(this[rowNum]);
    }

    return output;
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