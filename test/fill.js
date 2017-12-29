'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.fill(value)', function () {
    let grid = undefined;

    before(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
    });

    it('should fill all grid cells with the provided value', function () {
        assert.deepEqual(new Planar(grid).fill('x').grid(), [
            ['x', 'x', 'x'],
            ['x', 'x', 'x'],
            ['x', 'x', 'x']
        ]);
    });

    it('should return an error object if no argument is provided', function () {
        assert.instanceOf(new Planar(grid).fill(), Error);
    });
});

describe('Planar.fillArea(value, row, col, height, width)', function () {
    let grid = undefined;

    beforeEach(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
    });

    it('should fill the specified grid cells with the provided value', function () {
        assert.deepEqual(new Planar(grid).fillArea('x', 0, 0, 2, 2).grid(), [
             ['x', 'x', 3],
             ['x', 'x', 6],
             [7, 8, 9]
        ]);

        assert.deepEqual(new Planar(grid).fillArea('x', 0, 1, 2, 2).grid(), [
            [1, 'x', 'x'],
            [4, 'x', 'x'],
            [7, 8, 9]
        ]);

        assert.deepEqual(new Planar(grid).fillArea('x', 1, 0, 2, 2).grid(), [
            [1, 2, 3],
            ['x', 'x', 6],
            ['x', 'x', 9]
        ]);

        assert.deepEqual(new Planar(grid).fillArea('x', 1, 1, 2, 2).grid(), [
            [1, 2, 3],
            [4, 'x', 'x'],
            [7, 'x', 'x']
        ]);
    });

    it('should return an error object if the specified area is out of bounds', function () {
        assert.instanceOf(new Planar(grid).fillArea('x', -1, -1, 2, 2), Error);
        assert.instanceOf(new Planar(grid).fillArea('x', 0, 1, 3, 3), Error);
        assert.instanceOf(new Planar(grid).fillArea('x', 1, 0, 3, 3), Error);
        assert.instanceOf(new Planar(grid).fillArea('x', 0, 0, 4, 4), Error);
    })

    it('should return an error object if the incorrect number of arguments is provided', function () {
        assert.instanceOf(new Planar(grid).fillArea('x'), Error);
        assert.instanceOf(new Planar(grid).fillArea('x', 0), Error);
        assert.instanceOf(new Planar(grid).fillArea('x', 0, 0), Error);
        assert.instanceOf(new Planar(grid).fillArea('x', 0, 0, 0), Error);
    });
});