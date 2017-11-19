'use strict';

const chai = require('chai');
const mocha = require('mocha');
const Planar = require('../index');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Planar(grid)', function () {
    let invalidGrid = undefined;
    let numberGrid = undefined;
    let stringGrid = undefined;
    let objectGrid = undefined;
    let mixedGrid = undefined;

    before(function () {
        invalidGrid = [
            [1, 2, 3, 4],
            [4, 5, 6],
            [8, 9, 10]
        ];
        numberGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        stringGrid = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];
        objectGrid = [
            [{ value: 1 }, { value: 2 }, { value: 3 }],
            [{ value: '4' }, { value: '5' }, { value: '6' }],
            [{ value: 7 }, { value: 8 }, { value: 9 }]
        ];
        mixedGrid = [
            [1, '2', { value: 3 }],
            [4, '5', { value: 6 }],
            [7, '8', { value: 9 }]
        ];
    });

    it('should instantiate only when passed a valid grid', function () {
        assert.deepEqual(new Planar([[]]).grid, [[]]);
        assert.deepEqual(new Planar(numberGrid).grid, numberGrid);
        assert.instanceOf(new Planar(invalidGrid), Error);
    });

    it('should instantiate without modifying the passed grid', function() {
        assert.deepEqual(new Planar(numberGrid).grid, numberGrid);
        assert.deepEqual(new Planar(stringGrid).grid, stringGrid);
        assert.deepEqual(new Planar(objectGrid).grid, objectGrid);
        assert.deepEqual(new Planar(mixedGrid).grid, mixedGrid);
    });

    it('should allow bracket syntax to access grid values', function () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                assert.deepEqual(new Planar(numberGrid)[i][j], numberGrid[i][j]);
                assert.deepEqual(new Planar(stringGrid)[i][j], stringGrid[i][j]);
                assert.deepEqual(new Planar(objectGrid)[i][j], objectGrid[i][j]);
                assert.deepEqual(new Planar(mixedGrid)[i][j], mixedGrid[i][j]);
            }
        }
    })

    it('should instantiate with the correct width and height', function() {
        let planar = new Planar(numberGrid);
        assert.strictEqual(planar.width, 3);
        assert.strictEqual(planar.height, 3);
    });
    
    it('should return an Error object if the passed grid is malformed', function () {
        assert.instanceOf(new Planar(numberGrid), Planar);
        assert.instanceOf(new Planar(stringGrid), Planar);
        assert.instanceOf(new Planar(objectGrid), Planar);
        assert.instanceOf(new Planar(mixedGrid), Planar);
        assert.instanceOf(new Planar(1), Error);
        assert.instanceOf(new Planar({}), Error);
        assert.instanceOf(new Planar([1, 2, 3]), Error);
    });

});