'use strict';

const config = require('../../config/configLoader');
const QueryTodosFile = require('../models/QueryTodosFile');
const IdIncrementor = require('../../utils/IdIncrementor');

 const getNewId = () => {

   
    const jsonFilePath = config.paths.todoJsonFile;
    const alias = "TD";
    console.log(jsonFilePath);
    const queryFileTodos = new QueryTodosFile(jsonFilePath);
    const data = queryFileTodos.getTodos();
    
    console.log(queryFileTodos.getFilePath());

    const increment = new IdIncrementor({data : data.todos , aliasId : alias});
    const newId = increment.getNewId();

    return newId;
}

function getDateDifference(){

}

module.exports = getNewId;