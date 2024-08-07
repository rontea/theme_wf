'use strict';


const {logErr , ErrorLogger} = require('../../src/utils/errorHandler/ErrorLogger');

/**
    Test created default
*/
console.log("Error Test");

try{
    /** Test Time */
consol.log(currentTime.getTime());

}catch(err) {

    logErr.writeLog(err, { sampleKey : 'sample'} )

}


/**
    Test Class
*/
console.log("Error Test New DIR");

const testErrLogger = new ErrorLogger({dir: './testLog' , file: './testLog/testLog.log'});

try{
    /** Test Time */
consol.log(currentTime.getTime());

}catch(err) {

    testErrLogger.writeLog(err, { type : 'custom log'} )

}
