'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');
const {format , differenceInDays} = require('date-fns');


const jsonFilePath = path.join(__dirname, 'todos.json');

const queryFileTodos = new QueryTodosFile(jsonFilePath);

const statuses = [    
    "UnassignedEditted",
    "To Do",
    "In Progress",
    "Code Review",
    "TestingEditted",
    "Blocked",
    "Completed",
    "Deployed",
    "On Hold",
    "New"
];

const queryTodos = new QueryTodos(statuses, { path : jsonFilePath});

queryTodos.saveTodoStatuses();