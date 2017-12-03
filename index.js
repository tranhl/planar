'use strict';

/**
 * Constructs a Planar object.
 * 
 * @param {any} grid 
 * @returns The Planar object.
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