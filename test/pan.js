'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.pan(axis, steps)', function () {
    let grid = undefined;

    before(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
    });

    it('should pan to the right', function () {
        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_X, 1).grid(), [
            [3, 1, 2],
            [6, 4, 5],
            [9, 7, 8]
        ]);

        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_X, 2).grid(), [
            [2, 3, 1],
            [5, 6, 4],
            [8, 9, 7]
        ]);
    });

    it('should pan to the left', function () {
        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_X, -1).grid(), [
            [2, 3, 1],
            [5, 6, 4],
            [8, 9, 7]
        ]);

        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_X, -2).grid(), [
            [3, 1, 2],
            [6, 4, 5],
            [9, 7, 8]
        ]);
    });

    it('should pan upwards', function () {
        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_Y, 1).grid(), [
            [4, 5, 6],
            [7, 8, 9],
            [1, 2, 3]
        ]);

        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_Y, 2).grid(), [
            [7, 8, 9],
            [1, 2, 3],
            [4, 5, 6]
        ]);
    });

    it('should pan downwards', function () {
        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_Y, -1).grid(), [
            [7, 8, 9],
            [1, 2, 3],
            [4, 5, 6]
        ]);

        assert.deepEqual(new Planar(grid).pan(Planar.AXIS_Y, -2).grid(), [
            [4, 5, 6],
            [7, 8, 9],
            [1, 2, 3]
        ]);
    });

    it('should return an error object when passed a steps value of 0', function () {
        assert.instanceOf(new Planar(grid).pan(Planar.AXIS_X, 0), Error);
        assert.instanceOf(new Planar(grid).pan(Planar.AXIS_Y, 0), Error);
    });

    it('should return an error object when passed an incorrect number of arguments', function () {
        assert.instanceOf(new Planar(grid).pan(), Error);
        assert.instanceOf(new Planar(grid).pan(Planar.AXIS_X), Error);
        assert.instanceOf(new Planar(grid).pan(Planar.AXIS_Y), Error);
    });
});