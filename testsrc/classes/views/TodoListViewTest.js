'use strict';
const path = require('path');
const TodoListView = require('../../../src/classes/views/TodoListView');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');




const jsonFilePath = path.join(__dirname, '../models/todos.json');

const queryFileTodos = new QueryTodosFile(jsonFilePath);

const data = queryFileTodos.getTodos();


const todoListView = new TodoListView(data);

console.log(todoListView.getHeader());

const viewList = todoListView.getList();

console.log(viewList);

const listView = todoListView.getDetails();

console.log(listView[0]);
console.log(listView[1]);
console.log(listView[2]);
console.log(listView[3]);
