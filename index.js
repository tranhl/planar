'use strict';

const ROTATE_CW = 'ROTATE_CW';
const ROTATE_ACW = 'ROTATE_ACW';
const AXIS_X = 'X';
const AXIS_Y = 'Y';

/**
 * Constructs a Planar object.
 * 
 * @param {any} grid 
 * @returns A Planar object instance.
 */
let Planar = function (grid) {
    if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
        return new Error(`Argument is not a 2d array`);
    }

    if (!isRectangular(grid)) {
        return new Error('Argument is not rectangular');
    }

    for (let rowNum = 0; rowNum < grid.length; rowNum++) {
        this[rowNum] = grid[rowNum];
    }
    
    this.width = grid[0].length;
    this.height = grid.length;
};

/*
    Basic methods
 */

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

/*
    Essential methods
 */

/**
 * Extracts a rectangular subset of the Planar.
 * Does not overstep the boundaries of the Planar.
 * 
 * @param {any} row The row index to start cropping from.
 * @param {any} col The column index to start cropping from.
 * @param {any} width The width of the resulting grid.
 * @param {any} height The height of the resulting grid.
 * @returns The cropped grid, or an Error object if overstepping occurs.
 */
Planar.prototype.crop = function (row, col, width, height) {
    if (row + height > this.height) {
        return new Error(`Row overstep detected: starting row index ${row}, output height ${height}, Planar height ${this.height}`);
    }

    if (col + width > this.width) {
        return new Error(`Column overstep detected: starting column index ${col}, output width ${width}, Planar width ${this.width}`);        
    }

    let output = [];

    for (let rowNum = row; rowNum < row + height; rowNum++) {
        let rowBuffer = [];

        for (let colNum = col; colNum < col + width; colNum++) {
            rowBuffer.push(this[rowNum][colNum]);
        }

        output.push(rowBuffer);
    }

    return output;
}

/**
 * Extracts a rectangular subset of the Planar.
 * Oversteps the boundaries of the Planar, filling missing values with nulls.
 * 
 * @param {any} row The row index to start cropping from.
 * @param {any} col The column index to start cropping from.
 * @param {any} width The width of the resulting grid.
 * @param {any} height The height of the resulting grid.
 * @returns The cropped grid.
 */
Planar.prototype.harvest = function (row, col, width, height) {
    let output = [];

    for (let rowNum = row; rowNum < row + height; rowNum++) {
        let rowBuffer = [];

        for (let colNum = col; colNum < col + width; colNum++) {
            if (!this.hasOwnProperty(rowNum) || colNum < 0 || colNum >= this[rowNum].length) {
                rowBuffer.push(null);
                continue;
            }

            rowBuffer.push(this[rowNum][colNum]);
        }
        
        output.push(rowBuffer);
    }

    return output;
}

/**
 * Rotates the Planar 90 degrees clockwise or anticlockwise.
 * Specify direction using the ROTATE_CW or ROTATE_ACW package constants.
 * 
 * @param {any} direction The direction to rotate the Planar.
 * @returns A reference to the Planar, or an Error object when a direction is not specified.
 */
Planar.prototype.rotate = function (direction) {
    switch (direction) {
        case ROTATE_CW: {
            rotateClockwise.apply(this);
            return this;
        }
        case ROTATE_ACW: {
            rotateAntiClockwise.apply(this);
            return this;
        }
        default:
            return new Error('Direction not specified.');
    }
};

function rotateClockwise() {
    let buffer = buildEmptyGrid(this.height, this.width);
    
    for (let colNum = 0; colNum < this.width; colNum++) {
        for (let rowNum = this.height - 1; rowNum >= 0; rowNum--) {
            buffer[(colNum + this.width) % this.width][(rowNum + 1) * (this.height - 1) % this.height] = this[rowNum][colNum];
        }
    }
    
    clearInternalGrid.apply(this);
    copyBufferToInternalGrid.apply(this, [buffer]);
}

function buildEmptyGrid(width, height) {
    return [...Array(height).keys()].map(i => Array(width));
}

function rotateAntiClockwise() {
    let buffer = buildEmptyGrid(this.height, this.width);
    
    for (let colNum = this.width - 1; colNum >= 0; colNum--) {
        for (let rowNum = 0; rowNum < this.height; rowNum++) {
            buffer[(colNum + 1) * (this.width - 1) % this.width][(rowNum + this.height) % this.height] = this[rowNum][colNum];
        }
    }
    
    clearInternalGrid.apply(this);
    copyBufferToInternalGrid.apply(this, [buffer]);
}

function clearInternalGrid() {
    for (let rowNum = 0; rowNum < this.height; rowNum++) {
        delete this[rowNum];
    }

    delete this.width;
    delete this.height;
}

function copyBufferToInternalGrid(buffer) {
    for (let rowNum = 0; rowNum < buffer.length; rowNum++) {
        let row = buffer[rowNum];
        this[rowNum] = [];

        for (let colNum = 0; colNum < row.length; colNum++) {
            this[rowNum][colNum] = buffer[rowNum][colNum];
        }
    }

    this.width = buffer[0].length;
    this.height = buffer.length;
}

/**
 * Flips the Planar's internal grid over the provided axis.
 * 
 * @param {any} axis 
 * @returns 
 */
Planar.prototype.flip = function(axis) {
    switch (axis) {
        case AXIS_X: {
            flipHorizontally.apply(this);
            return this;
        }
        case AXIS_Y: {
            flipVertically.apply(this);
            return this;
        }
        default:
            return new Error('Axis not specified.');
    }
};

function flipHorizontally() {
    let buffer = [];

    for (let rowNum = this.height - 1; rowNum >= 0; rowNum--) {
        let rowBuffer = [];

        for (let colNum = 0; colNum < this.width; colNum++) {
            rowBuffer.push(this[rowNum][colNum]);    
        }

        buffer.push(rowBuffer);
    }

    clearInternalGrid.apply(this);
    copyBufferToInternalGrid.apply(this, [buffer]);
}

function flipVertically() {
    let buffer = [];

    for (let rowNum = 0; rowNum < this.height; rowNum++) {
        let rowBuffer = [];

        for (let colNum = this.width - 1; colNum >= 0; colNum--) {
            rowBuffer.push(this[rowNum][colNum]);    
        }

        buffer.push(rowBuffer);
    }

    clearInternalGrid.apply(this);
    copyBufferToInternalGrid.apply(this, [buffer]);
}

module.exports = Planar;
module.exports.ROTATE_CW = ROTATE_CW;
module.exports.ROTATE_ACW = ROTATE_ACW;
module.exports.AXIS_X = AXIS_X;
module.exports.AXIS_Y = AXIS_Y;