'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.trim(side, [times])', function () {
    let grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];

    it('should trim the top of the grid', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.TOP).grid(), [
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ]);
    });

    it('should trim the top of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.TOP, 3).grid(), [
            [13, 14, 15, 16]
        ]);
    });

    it('should trim the bottom of the grid', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.BOTTOM).grid(), [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ]);
    });

    it('should trim the bottom of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.BOTTOM, 3).grid(), [
            [1, 2, 3, 4]
        ]);
    });

    it('should trim the left of the grid', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.LEFT).grid(), [
            [2, 3, 4],
            [6, 7, 8],
            [10, 11, 12],
            [14, 15, 16]
        ]);
    });

    it('should trim the left of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.LEFT, 3).grid(), [
            [4],
            [8],
            [12],
            [16]
        ]);
    });

    it('should trim the right of the grid', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.RIGHT).grid(), [
            [1, 2, 3],
            [5, 6, 7],
            [9, 10, 11],
            [13, 14, 15]
        ]);
    });

    it('should trim the right of the grid by the specified number of times', function () {
        assert.deepEqual(new Planar(grid).trim(Planar.SIDES.RIGHT, 3).grid(), [
            [1],
            [5],
            [9],
            [13]
        ]);
    });

    it('should return an error object when an incorrect number of arguments is passed', function () {
        assert.instanceOf(new Planar(grid).trim(), Error);
    });

    it('should throw an Error when times is greater or equal to the planar height', function () {
        expect(() => new Planar(grid).trim(Planar.SIDES.TOP, 4)).to.throw();
        expect(() => new Planar(grid).trim(Planar.SIDES.BOTTOM, 4)).to.throw();
    });
    
    it('should throw an Error when times is greater or equal to the planar width', function () {
        expect(() => new Planar(grid).trim(Planar.SIDES.LEFT, 4)).to.throw();
        expect(() => new Planar(grid).trim(Planar.SIDES.RIGHT, 4)).to.throw();
    });
});