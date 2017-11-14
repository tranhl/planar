'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.set(row, col, value)', function () {
    let grid = undefined;
    let planar = undefined;
    const newValue = 'x';

    before(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        planar = new Planar(grid);
    });

    afterEach(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        planar = new Planar(grid);
    })

    it('should updated the correct cell with the value', function () {
        for (let i = 0; i < planar.height; i++) {
            for (let j = 0; j < planar.width; j++) {
                planar.set(i, j, newValue);
                assert.strictEqual(planar.get(i, j), newValue);
                assert.strictEqual(planar[i][j], newValue);
            }
        }
    });

    it('should return an Error object when indices are out of bounds', function () {
        assert.instanceOf(planar.set(3, 2, newValue), Error);
    });
});