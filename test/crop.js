'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.crop(row, col, width, height)', function () {
    let grid = undefined;

    before(function () {
        grid = [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
            [13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24],
        ];
    });

    it('should crop the grid with no overstepping', function () {
        assert.deepEqual(new Planar(grid).crop(0, 0, 3, 3), [
            [1, 2, 3],
            [7, 8, 9],
            [13, 14, 15]
        ]);

        assert.deepEqual(new Planar(grid).crop(0, 3, 3, 3), [
            [4, 5, 6],
            [10, 11, 12],
            [16, 17, 18]
        ]);
        
        assert.deepEqual(new Planar(grid).crop(1, 0, 3, 3), [
            [7, 8, 9],
            [13, 14, 15],
            [19, 20, 21]
        ]);

        assert.deepEqual(new Planar(grid).crop(1, 3, 3, 3), [
            [10, 11, 12],
            [16, 17, 18],
            [22, 23, 24]
        ]);

        assert.instanceOf(new Planar(grid).crop(4, 4, 3, 3), Error);
    });
});