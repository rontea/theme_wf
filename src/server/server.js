const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TodoController = require('../controllers/todoController');

const app = express();
const port = 3100;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// / is index > res (path)
app.get('/', (req, res) => {
   
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// Route for the new page
app.get('/addtodo', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'addtodo.html'));
});

// action /add-todo > to do controller
// addTodo is static
// req ??
app.post('/add-todo', TodoController.addTodo);

// listen to port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
