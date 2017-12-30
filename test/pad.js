'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.pad(value, side, [times])', function () {
    let grid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    it('should pad the top of the grid', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.TOP).grid(), [
            ['x', 'x', 'x'],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
    });

    it('should pad the top of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.TOP, 3).grid(), [
            ['x', 'x', 'x'],
            ['x', 'x', 'x'],
            ['x', 'x', 'x'],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
    });

    it('should pad the bottom of the grid', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.BOTTOM).grid(), [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            ['x', 'x', 'x']
        ]);
    });

    it('should pad the bottom of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.BOTTOM, 3).grid(), [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            ['x', 'x', 'x'],
            ['x', 'x', 'x'],
            ['x', 'x', 'x']
        ]);
    });

    it('should pad the left of the grid', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.LEFT).grid(), [
            ['x', 1, 2, 3],
            ['x', 4, 5, 6],
            ['x', 7, 8, 9],
        ]);
    });

    it('should pad the left of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.LEFT, 3).grid(), [
            ['x', 'x', 'x', 1, 2, 3],
            ['x', 'x', 'x', 4, 5, 6],
            ['x', 'x', 'x', 7, 8, 9]
        ]);
    });

    it('should pad the right of the grid', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.RIGHT).grid(), [
            [1, 2, 3, 'x'],
            [4, 5, 6, 'x'],
            [7, 8, 9, 'x']
        ]);
    });

    it('should pad the right of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).pad('x', Planar.SIDES.RIGHT, 3).grid(), [
            [1, 2, 3, 'x', 'x', 'x'],
            [4, 5, 6, 'x', 'x', 'x'],
            [7, 8, 9, 'x', 'x', 'x']
        ]);
    });

    it('should return an error object when an incorrect number of arguments is passed', function () {
        assert.instanceOf(new Planar(grid).pad('x'), Error);
    });
});