'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');
const {format , differenceInDays} = require('date-fns');


const jsonFilePath = path.join(__dirname, 'todos.json');

const queryFileTodos = new QueryTodosFile(jsonFilePath);

const statuses = [    
    "Unassigned",
    "To Do",
    "In Progress",
    "Code Review",
    "Testing",
    "Blocked",
    "Completed",
    "Deployed",
    "On Hold"
];

const queryTodos = new QueryTodos(statuses, { path : jsonFilePath});

queryTodos.saveTodoStatuses();