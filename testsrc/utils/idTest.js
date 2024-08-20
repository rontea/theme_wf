'use strict';
const path = require('path');

const QueryTodosFile = require('../../src/classes/models/QueryTodosFile');

const IdIncrementor = require('../../src/utils/IdIncrementor');

const jsonFilePath = path.join(__dirname, '../classes/models/todos.json');

const queryFileTodos = new QueryTodosFile(jsonFilePath);


const data = queryFileTodos.getTodos();

const increment = new IdIncrementor({data : data.todos , aliasId : "TD"});

const newId = increment.getNewId();

console.log("Test new id : " , newId);

increment.checkData();

increment.showData();