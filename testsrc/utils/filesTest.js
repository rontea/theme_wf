'use strict';

/**
 *  Test File
 */

const file = require('../../src/utils/files/files');

// test dir 
const testDIR = "./config";

console.log(file.existsSync(testDIR)); // false

console.log(file.existsSync('./utilsTest'));// false

console.log(file.existsSync('../../src')); // true

//test file
console.log(file.existsSync('./utilsTest.js')); // true

console.log(file.existsSync('../../config/config.js')); // true

console.log(file.existsSync('../../config/configLoader.js')); // false