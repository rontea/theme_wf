const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TodoController = require('../controllers/todoController');

const app = express();
const port = 3100;

/** Parses incoming JSON payloads */
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));

/** Access Pages */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

app.get('/addtodo', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'addtodo.html'));
});

app.get('/edit/todo/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/edit', 'todo.html'));
});

/** Add Todos */
app.post('/api/addtodo', TodoController.addTodo);

//app.get('/api/todos', TodoController.getTodos);

//app.get('/api/todo/:id',  TodoController.getTodo);

//app.put('/api/todoedit/:id',TodoController.updateTodo); 
 
// listen to port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
