const assert = require('assert');

const testfile = require('./../js/generateMap')

describe('generateMap', function() {
    it("allowable values", function() {
        assert.equal(testfile.gm(0 , 0 , 0)[0], false);
        assert.equal(testfile.gm()[0], false);
        assert.equal(testfile.gm(-1 , 3 , 0)[0], false);
        assert.equal(testfile.gm(8 , 8 , 63).length, 8);
        assert.equal(testfile.gm(8 , 8 , 64)[0], false);
        assert.equal(testfile.gm(8 , 8 , 2445)[0], false);
    });
    it("number of bombs", function() {
        const countBombs = (arr) => {
            let c = 0
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length ; j++) {
                    if (arr[i][j] == 9) {
                        c += 1
                    }
                }
            }
            return c
        }
        assert.equal(countBombs(testfile.gm(8 , 8 , 10)) , 10)
        assert.equal(countBombs(testfile.gm(16 , 16 , 24)) , 24)
    });
    it("correct numbers", function() {
        const checkNumbers = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0 ; j < arr.length; j++) {
                    let c = 0
                    if (arr[i][j] != 9) {
                        if (i-1 >= 0 && j-1 >= 0) {if (arr[i-1][j-1] == 9) c++}
                        if (i-1 >= 0) {if (arr[i-1][j] == 9) c++}
                        if (i-1 >= 0 && j+1 < arr[i].length) {if (arr[i-1][j+1] == 9) c++}
                        if (j-1 >= 0) {if (arr[i][j-1] == 9) c++}
                        if (j+1 < arr[i].length) {if (arr[i][j+1] == 9) c++}
                        if (i+1 < arr.length && j-1 >= 0) {if (arr[i+1][j-1] == 9) c++}
                        if (i+1 < arr.length) {if (arr[i+1][j] == 9) c++}
                        if (i+1 < arr.length && j+1 < arr[i].length) {if (arr[i+1][j+1] == 9) c++}

                        if (arr[i][j] != c) {
                            console.log(arr[i][j] , c)
                            return false
                        }
                    }
                }
            }
            return true
        }
        assert.equal(checkNumbers(testfile.gm(16 , 16 , 24)) , true)
        assert.equal(checkNumbers(testfile.gm(32 , 32 , 34)) , true)
        assert.equal(checkNumbers(testfile.gm(8 , 8 , 5)) , true)
    });
});