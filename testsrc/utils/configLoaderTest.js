'use strict';

/**
 *  Test ConfigLoader
 */

const ConfigLoader = require('../../src/utils/configsets/ConfigLoader'); 

console.log("test configLoader functions");
const configLoader = new ConfigLoader();

console.log("test print function");
configLoader.printDetails();

const config = configLoader.loadConfig();

console.log("test config if working");
console.log(config);