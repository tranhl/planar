'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.rotate(direction)', function () {
    let oddGrid = undefined;
    let evenGrid = undefined;
    let rectangularGrid = undefined;
    let planar = undefined;

    before(function () {
        oddGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        evenGrid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];
        rectangularGrid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ];
    });

    it('should correctly rotate clockwise', function () {
        assert.deepEqual(new Planar(oddGrid).rotate(Planar.ROTATE_CW).grid(), [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3]
        ]);
        
        assert.deepEqual(new Planar(evenGrid).rotate(Planar.ROTATE_CW).grid(), [
            [13, 9, 5, 1],
            [14, 10, 6, 2],
            [15, 11, 7, 3],
            [16, 12, 8, 4]
        ]);

        assert.deepEqual(new Planar(rectangularGrid).rotate(Planar.ROTATE_CW).grid(), [
            [5, 1],
            [6, 2],
            [7, 3],
            [8, 4]
        ]);
    });

    it('should correctly rotate anticlockwise', function () {
        assert.deepEqual(new Planar(oddGrid).rotate(Planar.ROTATE_ACW).grid(), [
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7]
        ]);

        assert.deepEqual(new Planar(evenGrid).rotate(Planar.ROTATE_ACW).grid(), [
            [4, 8, 12, 16],
            [3, 7, 11, 15],
            [2, 6, 10, 14],
            [1, 5, 9, 13]
        ]);

        assert.deepEqual(new Planar(rectangularGrid).rotate(Planar.ROTATE_ACW).grid(), [
            [4, 8],
            [3, 7],
            [2, 6],
            [1, 5]
        ]);
    });

    it('should return an error object when a direction is not specified', function () {
        assert.instanceOf(new Planar(oddGrid).rotate(), Error);
    });
});