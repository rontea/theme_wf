'use strict';

const fs = require('fs');
const {logErr} = require('../errorHandler/ErrorLogger');
class file {


    static existsSync(file) {

        try {

            if(fs.existsSync(file)) {
               return true; 
            }else {
                return false;
            }

        }catch(err){
            logErr.writeLog(err , { existsSync : 'error on static method existSync'})
        }

    }

}

module.exports = file;