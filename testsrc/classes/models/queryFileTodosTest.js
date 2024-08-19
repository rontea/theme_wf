'use strict';
const path = require('path');
const QueryTodosFile = require('../../../src/classes/models/QueryTodosFile');
const QueryTodos = require('../../../src/classes/models/QueryTodos');
const IdIncrementor = require('../../../src/utils/IdIncrementor');


console.log("query file todo test, path set to this folder");

const jsonFilePath = path.join(__dirname, 'todos.json');

const queryFileTodos = new QueryTodosFile(jsonFilePath);

console.log(queryFileTodos.getFilePath());

const obj = queryFileTodos.getTodos();

console.log(obj);

console.log(queryFileTodos.isTodosEmpty());

console.log("Test save query todo ");

/** Query file to do test */
const increment = new IdIncrementor({propertyName: 'todos' , filePath : jsonFilePath});
const newId = increment.getNewId();

const todos = {
    id: newId,
    title: "req.body.title",
    date: "req.body.date",
    description: "req.body.description",
    type: "req.body.type",
    status: "req.body.status",
    assign: "req.body.assign",
    subtask: "req.body.subtask.split('\n')",
    comments: "req.body.comments",
  };

const queryTodos = new QueryTodos(todos, { path : jsonFilePath});

queryTodos.saveTodos();

const obj2 = queryTodos.getTodos();

console.log(obj2);

console.log("Incoming new");


const increment2 = new IdIncrementor({propertyName: 'todos' , filePath : jsonFilePath});
const newId2 = increment2.getNewId();

const newTodo = {
  id: newId2,
  title: "req.body.title 2",
  date: "req.body.date 2",
  description: "req.body.description 2",
  type: "req.body.type 2",
  status: "req.body.status 2",
  assign: "req.body.assign 2",
  subtask: "req.body.subtask.split('\n') 2",
  comments: "req.body.comments 2",
};

const queryTodos2 = new QueryTodos(newTodo, { path : jsonFilePath});
queryTodos2.saveTodos();

const obj3 = queryTodos2.getTodos();

console.log(obj3);

/** Test update */

console.log("test update");

const updateTodo = {
  id: "feature-todo-writer-TD02",
  title: "req.body.title 2 Update",
  date: "req.body.date 2 Update",
  description: "req.body.description 2 Update",
  type: "req.body.type 2 Update",
  status: "req.body.status 2 Update",
  assign: "req.body.assign 2 Update",
  subtask: "req.body.subtask.split('\n') 2 Update",
  comments: "req.body.comments 2 Update",
};

const queryTodos3 = new QueryTodos(updateTodo, { path : jsonFilePath});
queryTodos3.updateTodos();


const queryTodo = queryTodos3.getTodosById("feature-todo-writer-TD02");

console.log("Query return" , queryTodo);


const queryTodo2 = queryTodos3.getTodosById("feature-todo-writer-TD100");
console.log("Query return" , queryTodo2);

console.log("end of this");

