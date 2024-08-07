const TodoService = require('../services/todoService');

class TodoController {
  static addTodo(req, res) {
    /**
     *  this are all id for inputs > id , descriptions and so on...
     */

    const newTodo = {
      id: req.body.id,
      description: req.body.description,
      type: req.body.type,
      preConditions: req.body.preConditions,
      steps: req.body.steps.split('\n'),
      expectedResults: req.body.expectedResults,
      actualResults: req.body.actualResults,
      status: req.body.status,
      comments: req.body.comments,
    };

    TodoService.addTodo(newTodo);

    // redirect back
    res.redirect('/');
  }
}

module.exports = TodoController;