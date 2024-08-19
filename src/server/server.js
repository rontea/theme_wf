const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TodoController = require('../controllers/todoController');
const TodoModel = require("../models/todoModel");
const utils = require('../utils/utils');

const app = express();
const port = 3100;

/** parses incoming JSON payloads */
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});
app.get('/api/todos', TodoController.getTodos);

app.get('/addtodo', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'addtodo.html'));
});

app.get('/api/todo/:id',  TodoController.getTodo);

app.put('/api/todoedit/:id',TodoController.updateTodo); 
 
app.get('/edit/todo/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/edit', 'todo.html'));
});

app.post('/add-todo', TodoController.addTodo);

// listen to port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
