'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require.main.require('index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar.fill', function () {
    let grid = undefined;

    before(function () {
        grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
    });

    it('should fill all grid cells with the provided value', function () {
        assert.deepEqual(new Planar(grid).fill('x').grid(), [
            ['x', 'x', 'x'],
            ['x', 'x', 'x'],
            ['x', 'x', 'x']
        ]);
    });

    it('should return an error object if no argument is provided', function () {
        assert.instanceOf(new Planar(grid).fill(), Error);
    });
});