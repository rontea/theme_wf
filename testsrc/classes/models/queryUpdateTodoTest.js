'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');
const {format , differenceInDays} = require('date-fns');

const jsonFilePath = path.join(__dirname, 'todos.json');

/** Query file to do test */

const newId = "feature-todo-writer-TD02";

const now = new Date();

const date = format(now, "yyyy-MM-dd");

const todos = {
    id: "feature-todo-writer-TD02",
    title: `${newId} Todo Title`,
    date: date,
    days: differenceInDays(now,date),
    description: "This is the update discreption",
    type: "bug",
    status: "Unassigned",
    assign: "Unassigned",
    subtask: "NA",
    comments: "Updated",
  };

const queryTodos = new QueryTodos(todos, { path : jsonFilePath});

queryTodos.updateTodos();
