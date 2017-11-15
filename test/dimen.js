'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.dimen()', function () {
    let grid = undefined;
    let planar = undefined;

    before(function () {
        grid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ];
        planar = new Planar(grid);
    });

    it('should currectly return the dimensions of the grid', function () {
        assert.deepEqual(planar.dimen(), [4, 2]);
    });
});