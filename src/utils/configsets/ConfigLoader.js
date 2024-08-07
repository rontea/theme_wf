'use strict'

const path = require('path');
const {logErr} = require('../errorHandler/ErrorLogger');
const file = require('../files/files')

class ConfigLoader {

    #defaultConfigPath;
    #mainConfigPath;

    constructor(options = {}){
        
        try{
            this.#defaultConfigPath = options.pathDefault 
                || path.join(__dirname, '..' , '..', '..' , 'config' ,'config.js');
            this.#mainConfigPath = options.pathMain 
                || path.join(process.cwd(), 'config' , 'config.js');
        }catch(err){
            logErr.writeLog(err, {constructor : 'error constructor'})
        }   
        
    }

    loadConfig(){

        try{
            if(file.existsSync(this.#mainConfigPath)){
                return require(this.#mainConfigPath);
            }else{
                return require(this.#defaultConfigPath);
            }
        }catch(err){
            logErr.writeLog(err, {loadConfig : 'error on loadConfig'})
        }

    }

    printDetails() {

        try{
            console.log("Default Config :" , this.#defaultConfigPath);
            console.log("Main Config :" , this.#defaultConfigPath);
    
            console.log("Config in use" , this.loadConfig());

        }catch(err){
            logErr.writeLog(err, {printDetails : 'error on printDetails'})
        }
 
    }
};

module.exports = ConfigLoader;