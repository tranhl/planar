'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.get(row, col)', function () {
    let grid = undefined;
    let planar = undefined;

    before(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        planar = new Planar(grid);
    });

    it('should return the correct cell value', function () {
        let expectedValue = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                assert.strictEqual(planar.get(i, j), expectedValue);
                expectedValue++;
            }
        }
    });

    it('should return an Error object when indicies are out of bounds', function () {
        assert.instanceOf(planar.get(3, 2), Error);
    });
});