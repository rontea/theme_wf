'use strict';

const fs = require('fs');
const utils = require('../../utils/utils');

class QueryTodosFile{

    #jsonTodoFilePath;

    constructor(filePath){

        this.#jsonTodoFilePath = filePath || "";

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

    /**
     * 
     * @returns object
     */
    getTodos(){
        try {

            if(this.#jsonTodoFilePath === ""){
                throw new Error("Path is not defined");
            }

            if (fs.existsSync(this.#jsonTodoFilePath)) {
                const data = fs.readFileSync(this.#jsonTodoFilePath);
                return JSON.parse(data);
                }
                return [];
        }catch(err){
            console.log("getTodos Error" , err);
        }
    }
    /**
     * 
     * @returns boolean
     */

    isTodosEmpty(){
        const todos = this.getTodos();
        const isEmpty = utils.isArrayEmpty(todos);
        return isEmpty;
    }
}


module.exports = QueryTodosFile;