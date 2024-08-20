'use strict';

const path = require('path');
const TodoListView = require('../../../src/classes/views/TodoListView');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const UpdateMarkDown = require('../../../src/classes/services/UpdateMarkDown');
const { isArray } = require('../../../src/utils/utils');

const jsonFilePath = path.join(__dirname, '../models/todos.json');
const todoFilePath = path.join(__dirname, 'TODO.md');
const queryFileTodos = new QueryTodosFile(jsonFilePath);
const data = queryFileTodos.getTodos();
const todoListView = new TodoListView(data);

const header = todoListView.getHeader();
const todoList = todoListView.getList();
const todoDetails = todoListView.getDetails();

const writeTodo = new UpdateMarkDown( {filePath: todoFilePath });

const contentList = [];
let x = 0;
todoList.forEach( list => {

   
    contentList.push( `${list.main}`);

    if(isArray(list.sub)) {
        
        list.sub.forEach(sub => {
            contentList.push(`${sub}`);
            
        });
        
    }
   
});

const contentDetails = [];

todoDetails.forEach(details => {
    contentDetails.push(details);
});

const content = `${header}\n ${contentList.join('')}\n${contentDetails.join('')}`;

writeTodo.todoFileWrite(content);
