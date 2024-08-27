const TodoService = require('../services/todoService');
const getNewId = require('../classes/func/TodoFunc');
const TodoModel = require("../models/todoModel");
const utils = require('../utils/utils');

class TodoController {

  /**
   * Responsible for add TODO
   * @param {*} req 
   * @param {*} res 
   */
  static addTodo(req, res) {

    let id = "";
    let title = "";

    try{
    const subTaskString =  req.body.subtask;
    const subTaskTranformArray = utils.stringsToArray(subTaskString);
   
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

      id = newTodo.id;
      title = newTodo.title;

    }catch(err){
      res.json({ success: false , message : "Failed to save TODO" });
    }

    res.json({ success: true , message : "TODO added successful" , todo: { id : id , title : title} });
   
  }
  /**
   * Responsible ing getting all TODO
   * @param {*} req 
   * @param {*} res 
   */
  static getTodos(req,res){
    
   let dataTodo = [];
  
    try{
      
      const data = TodoModel.getTodos();
      dataTodo = data.todos;

    }catch(err){
      console.log(err);
    }
    // only one data is accepted 
    res.json(dataTodo);
  }
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static getStatuses(req,res) {
    const dataStatuses = TodoModel.getStatuses();
    const statuses = dataStatuses.statuses;
    
    res.json(statuses);
  }

  static getTypes(req,res) {
    const dataTypes = TodoModel.getTypes();
    const types = dataTypes.types;
    
    res.json(types);
  }

  

}

module.exports = TodoController;