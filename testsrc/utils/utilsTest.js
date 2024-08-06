'use strict';

const currentTime = require('../../src/utils/CreateTime');
const logErr = require('../../src/utils/ErrorLogger');


/** node utlsTest.js */


console.log("Time Test" , currentTime.getTime());
console.log("Error Test");

try{
    /** Test Time */
consol.log(currentTime.getTime());

}catch(err) {

    logErr.writeLog(err, { sampleKey : 'sample'} )

}


