const TodoService = require('../services/todoService');
const IdIncrementor = require('../utils/IdIncrementor');

class TodoController {
  static addTodo(req, res) {

    
    const increment = new IdIncrementor();
    const newId = increment.getNewId();

    /**
     *  this are all id for inputs > id , descriptions and so on...
     */

    const newTodo = {
      id: newId,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      status: req.body.status,
      subtask: req.body.subtask.split('\n'),
      comments: req.body.comments,
    };

    TodoService.addTodo(newTodo);

    // redirect back
    res.redirect('/');
  }
}

module.exports = TodoController;