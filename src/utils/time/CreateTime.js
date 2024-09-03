'use strict';
const {logErr} = require('../errorHandler/ErrorLogger');

class CreateTime {

    /**
     * Create time with pad zero
     * @returns string
    */
    getTime() {

        try{
            const currentTime = new Date();

            const hours = this.#padZero(currentTime.getHours());
            const minutes = this.#padZero(currentTime.getMinutes());
            const seconds = this.#padZero(currentTime.getSeconds());
            
            const timeString = `[${hours}:${minutes}:${seconds}]`;
            
            return timeString;

        }catch(err){
            logErr.writeLog(err, {getTime : 'error on getTime'})
        }
    }

    /**
     * Pads a number or string with a leading zero if it is a single digit.
     * @param {time} num 
     * @returns int
    */

    #padZero(num) {
        try{
            return (num < 10 ? '0' : '') + num;
        }catch(err){
            logErr.writeLog(err, {padZero : 'error on padZero'})
        }
    }

}

const currentTime = new CreateTime();
Object.freeze(currentTime);

module.exports = currentTime;