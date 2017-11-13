'use strict';

let Planar = function (grid) {
    if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
        return new Error(`Argument is not a valid 2d array.`);
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
 * @returns The value of the cell.
 * @throws 
 */
Planar.prototype.get = function (row, col) {
    try {
        return this.grid[row][col];
    } catch (err) {
        return new Error(`Out of bounds planar access in row ${row} col ${col}.`);
    }
}

module.exports = Planar;