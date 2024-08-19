const TodoService = require('../services/todoService');
const IdIncrementor = require('../utils/IdIncrementor');
const TodoModel = require("../models/todoModel");

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
      date: req.body.date,
      description: req.body.description,
      type: req.body.type,
      status: req.body.status,
      assign: req.body.assign,
      subtask: req.body.subtask.split('\n'),
      comments: req.body.comments,
    };

    TodoService.addTodo(newTodo);

    // redirect back
    res.redirect('/');
  }

  static updateTodo(req,res){
    const todoId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    console.log(todoId);
    console.log(title);
    console.log(description);
    console.log('Received body:', req.body);

    // update > get update > write update
    
  }

  static getTodo(req,res){

    const todoId = req.params.id;

    const todo = TodoModel.getTodoById(todoId);
    res.json(todo);

  }

  static getTodos(req,res){
    const todos = TodoModel.getTodos();
    res.json(todos);
  }

}

module.exports = TodoController;