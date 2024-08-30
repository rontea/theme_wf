'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');
const {format , differenceInDays} = require('date-fns');

const jsonFilePath = path.join(__dirname, 'todos.json');
const queryFileTodos = new QueryTodosFile(jsonFilePath);
const obj = queryFileTodos.getTodos();

/** Query file to do test */
const increment = new IdIncrementor({data : obj.todos , aliasId : "TD"});
const newId = increment.getNewId();

const now = new Date();

const date = format(now, "yyyy-MM-dd");

const todos = {
    id: newId,
    title: `${newId} Todo Title`,
    date: date,
    days: differenceInDays(now,date),
    description: "This is the Todo descptions of the new feature I'm working on",
    type: "feat",
    status: "Unassigned",
    assign: "Unassigned",
    subtask: "NA",
    comments: "Not yet assigned to anyone",
  };

const queryTodos = new QueryTodos(todos, { path : jsonFilePath});

queryTodos.saveTodos();
