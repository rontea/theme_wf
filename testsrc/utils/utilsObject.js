const config = require('../../src/config/configLoader');
const QueryTodos = require('../../src/classes/models/QueryTodos');
const QueryTodosFile = require('../../src/classes/models/QueryTodosFile');
const utils = require('../../src/utils/utils');

const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
let todosData = queryFileTodos.getTodos();

if(!utils.isObjectAvailable(todosData.statuses)){
    todosData = { statuses : ['no data']};
}

console.log(todosData.statuses);