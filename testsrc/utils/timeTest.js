'use strict';

/**
 *  Test time
 */

//const currentTime = require('../../src/utils/time/CreateTime');
const DateTime = require('../../src/utils/time/DateTime');


//console.log("Time Test" , currentTime.getTime());

const dateTime = new DateTime();

console.log(dateTime.getDateTime('EEEE, MMMM dd, yyyy'));
console.log(dateTime.getDateTime('EEEE, MMMM dd, yyyy' , 'hh:mm a'));
dateTime.addDays(1)
console.log(dateTime.getDate('EEEE, MMMM dd, yyyy'));
dateTime.addHours(3);
console.log(dateTime.getTime('hh:mm a'));

console.log(dateTime.getNumDaysFromDate('2024-08-19'));

console.log(dateTime.getNumDaysFromDate('2024-08-29'));



/** Valid format 2024-08-21 14:31:10 */
const dateTime2 = new DateTime({date: '2024-09-21' , time: '23:22:00'});


console.log(dateTime2.getDate('EEEE, MMMM dd, yyyy'));
console.log(dateTime2.getTime('hh:mm a'));
console.log(dateTime2.getDateTime());