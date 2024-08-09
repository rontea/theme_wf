'use strict';
/**
Error Test
(node:33988) Warning: Accessing non-existent property 'logErr' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
*/
const ErrorLogger = require('./errorHandler/ErrorLogger');

const logError = new ErrorLogger();

module.exports = logError;