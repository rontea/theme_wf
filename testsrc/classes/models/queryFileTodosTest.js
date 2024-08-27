'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');
const {format , differenceInDays} = require('date-fns');


console.log("query file todo test, path set to this folder");

const jsonFilePath = path.join(__dirname, 'todos.json');

const queryFileTodos = new QueryTodosFile(jsonFilePath);

console.log(queryFileTodos.getFilePath());

const obj = queryFileTodos.getTodos();

console.log(obj.statuses);

console.log(queryFileTodos.isTodosEmpty());

console.log("Test save query todo ");

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

const obj2 = queryTodos.getTodos();

console.log(obj2);

console.log("Incoming new");


const increment2 = new IdIncrementor({data : obj.todos , aliasId : "TD"});
const newId2 = increment2.getNewId();

const newTodo = {
  id: newId2,
  title: `${newId} Todo Title`,
  date: date,
  days: differenceInDays(now,date),
  description: "This is the Todo bug fix that I'm working on",
  type: "feat",
  status: "Unassigned",
  assign: "Unassigned",
  subtask: "NA",
  comments: "Not yet assigned to anyone",
};

const queryTodos2 = new QueryTodos(newTodo, { path : jsonFilePath});
queryTodos2.saveTodos();

const obj3 = queryTodos2.getTodos();

console.log(obj3);

/** Test update */

console.log("test update");

const updateTodo = {
  id: "feature-todo-writer-TD02",
  title: `${newId} Todo Title`,
  date: date,
  days: differenceInDays(now,date),
  description: "This is the Todo bug fix that I'm working on",
  type: "refactor",
  status: "Unassigned",
  assign: "Rontea",
  subtask: [ "feature-todo-writer-TD01" ,  "feature-todo-writer-TD01" ],
  comments: "Will wait fot your update",
};

const queryTodos3 = new QueryTodos(updateTodo, { path : jsonFilePath});
queryTodos3.updateTodos();


const queryTodo = queryTodos3.getTodosById("feature-todo-writer-TD02");

console.log("Query return" , queryTodo);


const queryTodo2 = queryTodos3.getTodosById("feature-todo-writer-TD100");
console.log("Query return" , queryTodo2);

console.log("end of this");

