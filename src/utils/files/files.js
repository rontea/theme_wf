'use strict';

const fs = require('fs');
const path = require('path');

class file {

    /**
     * Check if file exists
     * @param {file path} file 
     * @returns boolean
    */

    static existsSync(file) {

        try {

            if(fs.existsSync(file)) {
               return true; 
            }else {
                return false;
            }

        }catch(err){
            console.log("existsSync ", err);
        }

    }

    /**
     * 
     * @param {file path} filePath 
     * @param {unicode transform format} transformFormat 
     * @returns rawdata : array
    */

    static readFileJsonSync(filePath , transformFormat) {
        try {
            
            let isJsonFile = this.isJsonFile(filePath);
            let isExist = this.existsSync(filePath);

            if(isExist &&  isJsonFile ){
                const rawData = fs.readFileSync(filePath, transformFormat);
                return rawData;
            }else {

                if(!isJsonFile) {
                    console.log("File is not JSON file ", filePath);
                }
                if(!isExist) {
                    console.log("File do not exist " , filePath);
                }
               
                return [];
            }

        }catch(err){
            console.log("readFileSync ", err);
        }
    }

    /**
     * Check if the file exist
     * @param {file path} filePath 
    */

    static checkFilePath(filePath) {
        
        try {
            console.log(filePath);
            if(this.existsSync){
                console.log('File Exist !!');
            }else {
                console.log("File Does Not Exist!!");
            }
        }catch(err) {
            console.log("checkFilePath ", err);
        }
       
    }

    /**
     * Check if the file is JSON file
     * @param {file path} filePath 
     * @returns boolean
    */

    static isJsonFile(filePath){
        try{
            return path.extname(filePath) === '.json' ? true : false;
        }catch(err){
            console.log("isJsonFile " , err);
        }   
       
    }

}

module.exports = file;