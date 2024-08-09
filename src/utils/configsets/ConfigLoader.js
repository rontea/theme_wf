'use strict'

const path = require('path');
const file = require('../files/files');

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
            console.log("error constructor" , err );
        }   
        
    }

    /**
     * Load the config
     * @returns config
    */

    loadConfig(){

        try{
            if(file.existsSync(this.#mainConfigPath)){
                return require(this.#mainConfigPath);
            }else{
                return require(this.#defaultConfigPath);
            }
        }catch(err){
            console.log("error on loadConfig" , err );
        }

    }

    /**
     * Display print details for debugging
    */

    printDetails() {

        try{
            console.log("Default Config :" , this.#defaultConfigPath);
            console.log("Main Config :" , this.#defaultConfigPath);
    
            console.log("Config in use" , this.loadConfig());

        }catch(err){
            console.log("error on printDetails" , err );
        }
 
    }
};

module.exports = ConfigLoader;