'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.harvest(row, col, width, height)', function () {
    let grid = undefined;

    before(function () {
        grid = [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
            [13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24],
        ];
    });

    it('should harvest the grid, filling oversteps with nulls', function () {
        assert.deepEqual(new Planar(grid).harvest(0, 0, 3, 3), [
            [1, 2, 3],
            [7, 8, 9],
            [13, 14, 15]
        ]);

        assert.deepEqual(new Planar(grid).harvest(0, 3, 3, 3), [
            [4, 5, 6],
            [10, 11, 12],
            [16, 17, 18]
        ]);
        
        assert.deepEqual(new Planar(grid).harvest(1, 0, 3, 3), [
            [7, 8, 9],
            [13, 14, 15],
            [19, 20, 21]
        ]);

        assert.deepEqual(new Planar(grid).harvest(1, 3, 3, 3), [
            [10, 11, 12],
            [16, 17, 18],
            [22, 23, 24]
        ]);

        assert.deepEqual(new Planar(grid).harvest(-1, -1, 3, 3), [
            [null, null, null],
            [null, 1, 2],
            [null, 7, 8]
        ]);

        assert.deepEqual(new Planar(grid).harvest(2, 4, 3, 3), [
            [17, 18, null],
            [23, 24, null],
            [null, null, null]
        ]);
    });
});