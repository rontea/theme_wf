'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');
const {format , differenceInDays} = require('date-fns');


console.log("query file todo test, path set to this folder");

// set filepath
const jsonFilePath = path.join(__dirname, 'todos.json');
// set filepath
const queryFileTodos = new QueryTodosFile(jsonFilePath);
// get todo test

console.log(queryFileTodos.getFilePath());
console.log(queryFileTodos.isPathExist());

const obj = queryFileTodos.getTodos();
console.log(obj.todos);


