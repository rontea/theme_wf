'use strict';

const fs = require('fs');
const path = require('path');

class file {


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

    static readFileJsonSync(filePath) {
        try {
            
            let isJsonFile = this.isJsonFile(filePath);
            let isExist = this.existsSync(filePath);

            if(isExist &&  isJsonFile ){
                const rawData = fs.readFileSync(filePath, 'utf-8');
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

    static isJsonFile(filePath){
        try{
            return path.extname(filePath) === '.json' ? true : false;
        }catch(err){
            console.log("isJsonFile " , err);
        }   
       
    }

}

module.exports = file;