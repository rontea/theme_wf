'use strict';

const config = require('../../config/configLoader');
const QueryTodosFile = require('../models/QueryTodosFile');
const IdIncrementor = require('../../utils/IdIncrementor');

 const getNewId = () => {

    const jsonFilePath = config.paths.todoJsonFile;
    const alias = "TD";
    const queryFileTodos = new QueryTodosFile(jsonFilePath);
    const data = queryFileTodos.getTodos();

    const increment = new IdIncrementor({data : data.todos , aliasId : alias});
    const newId = increment.getNewId();

    return newId;
}

module.exports = getNewId;