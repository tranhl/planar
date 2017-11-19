'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.area()', function () {
    let squareGrid = undefined;
    let rectangularGrid = undefined;
    let flatGrid = undefined;
    let narrowGrid = undefined;
    let emptyGrid = undefined;

    before(function () {
        squareGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        rectangularGrid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ];
        flatGrid = [
            [1, 2, 3, 4]
        ];
        narrowGrid = [
            [1],
            [2],
            [3],
            [4],
            [5]
        ];
        emptyGrid = [[]];
    })

    it('should correctly calculate t(he area of a planar', function () {
        assert.strictEqual(new Planar(squareGrid).area(), 9);
        assert.strictEqual(new Planar(rectangularGrid).area(), 8);
        assert.strictEqual(new Planar(flatGrid).area(), 4);
        assert.strictEqual(new Planar(narrowGrid).area(), 5);
        assert.strictEqual(new Planar(emptyGrid).area(), 0);
    });
});