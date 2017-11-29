'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.grid()', function () {
    let grid = undefined;

    before(function () {
        grid = [
            [1, 2, 3, 4],
            ['a', 'b', 'c', 'd'],
            [5, 6, 7, 8]
        ];
    });

    it('should correctly return the internal grid', function () {
        assert.deepEqual(new Planar(grid).grid(), grid);
    });
});