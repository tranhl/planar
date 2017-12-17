'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.flip(axis)', function () {
    let gridOdd = undefined;
    let gridEven = undefined;

    before(function () {
        gridOdd = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        gridEven = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];
    });

    it('should flip horizontally', function () {
        assert.deepEqual(new Planar(gridOdd).flip(Planar.AXIS_X).grid(), [
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3]
        ]);
        
        assert.deepEqual(new Planar(gridEven).flip(Planar.AXIS_X).grid(), [
            [13, 14, 15, 16],
            [9, 10, 11, 12],
            [5, 6, 7, 8],
            [1, 2, 3, 4]
        ]);
    });

    it ('should flip vertically', function () {
        assert.deepEqual(new Planar(gridOdd).flip(Planar.AXIS_Y).grid(), [
            [3, 2, 1],
            [6, 5, 4],
            [9, 8, 7]
        ]);

        assert.deepEqual(new Planar(gridEven).flip(Planar.AXIS_Y).grid(), [
            [4, 3, 2, 1],
            [8, 7, 6, 5],
            [12, 11, 10, 9],
            [16, 15, 14, 13]
        ]);
    });

    it('should return an error object when an axis is not specified', function () {
        assert.instanceOf(new Planar(gridOdd).flip(), Error);
    })
});