'use strict';

const fs = require('fs');
const utils = require('../../utils/utils');

class QueryTodosFile{

    #jsonTodoFilePath;
    #dataTodos;

    constructor(filePath){

        this.#jsonTodoFilePath = filePath || "";
        this.#dataTodos = this.#getData();
    }

    /**
     * 
     * @param {string} filePath 
     */

    setPath(filePath){
        this.#jsonTodoFilePath = filePath || "";
    }

    /**
     * 
     * @returns string path
     */
    getFilePath(){
        return this.#jsonTodoFilePath;
    }

    isPathExist(){
        try {

            if (fs.existsSync(this.#jsonTodoFilePath)) {
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log("is path exist" , err);
        }
    }

    #getData(){
        try {

            if(this.#jsonTodoFilePath === ""){
                throw new Error("Path is not defined");
            }

            if (this.isPathExist()) {
                const data = fs.readFileSync(this.#jsonTodoFilePath);
                return JSON.parse(data);
                }
                return {};
        }catch(err){
            console.log("getTodos Error" , err);
        }
    }

    /**
     * 
     * @returns object
     */
    getTodos(){
       return this.#dataTodos;
    }
    
}


module.exports = QueryTodosFile;