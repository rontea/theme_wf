'use strict';

/**
 *  Test File
 */

const file = require('../../src/utils/files/files');
const fs = require('fs');
const path = require('path');

// test dir 
const testDIR = "./config";

console.log(file.existsSync(testDIR)); // false

console.log(file.existsSync('./utilsTest'));// false

console.log(file.existsSync('../../src')); // true

//test file
console.log(file.existsSync('./utilsTest.js')); // true

console.log(file.existsSync('../../config/config.js')); // true

console.log(file.existsSync('../../config/configLoader.js')); // false


console.log("Read file test");

/** Test error */
const filePath = path.join(__dirname , 'todo.txt');

file.checkFilePath(filePath)
const rawData = file.readFileJsonSync(filePath, 'utf-8');
console.log(rawData);
/** Test existing file */
const filePath2 = path.join(__dirname , 'todos.json');

file.checkFilePath(filePath2)
const rawData2 = file.readFileJsonSync(filePath2, 'utf-8');
console.log(rawData2);