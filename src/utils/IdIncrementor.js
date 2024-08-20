'use strict';

const fs = require('fs');
const path = require('path');
const file = require('./files/files');
const utils = require('./utils');

class IdIncrementor {

   
    #data;
    #aliasId;
    #branch;
   

    constructor(options = {}) {

        try{

        const branch = utils.getCurrentBranch();
        this.#branch = branch;
        this.#data = options.data || [];
        const tempAlias = "DEF"
      
        if(branch === "main"){
            this.#aliasId = options.aliasId || "DEF";
        }else{
            this.#aliasId = `${branch}-${options.aliasId}` || `${branch}-${tempAlias}`;
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
            console.log("Alias :" , this.#aliasId);
            console.log("Branch :" , this.#branch);
        }catch(err){
            console.log("check Data error ", err)
        }

    }

    showData(){
        console.log("Showing Data :" , this.#data);
    }

    /**
     * Create new id with describe format
     * @param {array} parseData 
     * @returns new id
    */

    #findHighighestId(parseData){

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
            console.log("Error on find Highighest Id", err);
        }

    }

    /**
     * Execute new id creation
     * @returns id
     */

    getNewId(data = this.#data){
        
        try {

            this.#data = data;
            if(!utils.isArray(this.#data)){
                console.log("Accessing Error" , this.#data);
                throw new Error("Please check data");
            }
            const newId = this.#findHighighestId(this.#data);
            return newId;

        }catch(err){
            console.log("Get new id error " , err)
        }

    }


}

module.exports = IdIncrementor;