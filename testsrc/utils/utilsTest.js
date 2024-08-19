'use strict';

const utils = require('../../src/utils/utils');
const number0 = 0;

const number = 1;

const number2 = 3

const number3 = 10;

const number4 = 19;

const number5 = 20;

const number6 = 9;
console.log(utils.padZero(0));

console.log(utils.padZero(number));

console.log(utils.padZero(number2));

console.log(utils.padZero(number3));

console.log(utils.padZero(number4));

console.log(utils.padZero(number5));

console.log(utils.padZero(number6));

console.log("Test current branch");
console.log(utils.getCurrentBranch());

const branch = utils.getCurrentBranch();
console.log("Test stripURL");

console.log( utils.stripUrl(branch));

console.log("Test isArrayEmpty");

const array = {}; // obj
const array2 = []; // array
console.log(utils.isArrayEmpty(array));
console.log(utils.isArrayEmpty(array2));

const arrayX = {'note' : 'note', 'sample' : 'sample'};

console.log(utils.isArrayEmpty(arrayX));
