'use strict';

const fs = require('fs');
const path = require('path');
const file = require('./files/files');
const utils = require('./utils');

class IdIncrementor {

    #fileJSON;
    #filePath;
    #rawData;
    #tranformFormat;
    #aliasId;

    constructor(options = {}) {

        try{

        const branch = utils.getCurrentBranch();
        
        this.#fileJSON = options.fileName || 'todos.json';
        
        if(!file.isJsonFile(this.#fileJSON)){
            console.error("file is not a JSON file");
            throw error;
        }

        this.#filePath = options.filePath 
            || path.join(__dirname,  '..' , 'data' , this.#fileJSON);

        if(branch === "main"){
            this.#aliasId = options.aliasId || "TD";
        }else{
            this.#aliasId = options.aliasId || `${branch}-TD`;
        }
    
        this.#tranformFormat = options.transformFormat || 'utf-8';

            try{
                this.#rawData = file.readFileJsonSync(this.#filePath, this.#tranformFormat);
            }catch(err){
                console.log("Error reading file " , err);
            }
        
        }catch(err){
            console.log("Failed contructor ", err);
        }
        
    }

    /**
     * Debug data information 
     */

    checkData(){

        try{

            console.log("File Path ", this.#filePath);
            console.log("transform Format " , this.#tranformFormat);
            console.log("Raw Data" , this.#rawData);
    
            const parseData = this.#parseRawData();
            console.log("Parse Data" , parseData);
    
            const newId = this.findHighighestId(parseData);
            console.log("New ID" , newId);

        }catch(err){
            console.log("check Data error ", err)
        }

      
    }

    /**
     * Parse raw data to array
     * @returns parse data
    */

    #parseRawData(){

        let parseRaw;
        try{
            if(this.#rawData.length === 0){
                
                return [];
            }else {
                parseRaw = JSON.parse(this.#rawData);
                return parseRaw;
            }
           
        }catch(err){
            console.error("Error parsing ", err);
        }
       
    }

    /**
     * Create new id with describe format
     * @param {array} parseData 
     * @returns new id
    */

    findHighighestId(parseData){

        try {
            let highestId = 0;
            let idNumber = 0;
            let padNewId = 0;
           
            if(parseData.length === 0) {
                console.log("Data is Empty");
                padNewId = utils.padZero(highestId + 1);
                return `${this.#aliasId}${padNewId}`;
            }

            parseData.forEach((data) => {
                let number = parseInt(data.id.replace(this.#aliasId , '' ), 10);
                
                idNumber = isNaN(number) ? 0 : number;

                if(idNumber > highestId){
                    
                    highestId = idNumber;
                }
    
            });
            
            padNewId = utils.padZero(highestId + 1);
            const newId = `${this.#aliasId}${padNewId}`;
    
            return newId;

        }catch(err){
            console.log("Error on findHighighestId", err);
        }

    }

    /**
     * Execute new id creation
     * @returns id
     */

    getNewId(){
        let parseData = this.#parseRawData();
        const newId = this.findHighighestId(parseData);
        return newId;
    }

    getRawData(){
        return this.#rawData;
    }

}

module.exports = IdIncrementor;