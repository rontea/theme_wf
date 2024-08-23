const TodoService = require('../services/todoService');
const getNewId = require('../classes/func/TodoFunc');
const TodoModel = require("../models/todoModel");
const utils = require('../utils/utils');

class TodoController {
  static addTodo(req, res) {
    
    const subTaskString =  req.body.subtask;

    const subTaskTranformArray = utils.stringsToArray(subTaskString);

    try{
      const newTodo = {
        id: getNewId(),
        title: req.body.title,
        date: req.body.date,
        days: 0,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status,
        assign: req.body.assign,
        subtask: subTaskTranformArray,
        comments: req.body.comments,
      };
  
      TodoService.addTodo(newTodo);

    }catch(err){
      res.json({ success: false , message : "Failed to save todo" });
    }
    // redirect back
    res.json({ success: true , message : "Added Successful" });
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