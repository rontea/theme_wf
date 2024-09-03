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
      res.json({ success: false , message : "Failed to save TODO" , error : err });
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
      console.log('server error', err);
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

    try{
      const dataStatuses = TodoModel.getStatuses();
      const statuses = dataStatuses.statuses;
      
      res.json(statuses);
    }catch(err){
      console.log('server error', err);
    }

  }

  /**
   * Responsible in adding statuses
   * @param {*} req 
   * @param {*} res 
   */
  static addStatuses(req,res){
   
    try{
      
    const statuses = req.body;
    
    setTimeout(() => {
      TodoModel.saveStatuses(statuses);
    }, 2000);
    res.json('respond');
    
    }catch(err){
      console.log('server error', err);
    }

  }

  /**
   * Responsible in getting all statuses
   * @param {*} req 
   * @param {*} res 
   */

  static getTypes(req,res) {

    try{
      const dataTypes = TodoModel.getTypes();
      const types = dataTypes.types;
      
      res.json(types);
    }catch(err){
      console.log('server error' , err);
    }

  }


  /**
   * Reposible in updating Types
   * @param {*} req 
   * @param {*} res 
   */
  static addTypes(req,res){
   
    try{
      
    const types = req.body;
    
    setTimeout(() => {
      TodoModel.saveTypes(types);
    }, 2000);
    res.json('respond');
    
    }catch(err){
      console.log('server error' , err);
    }

  }

  /**
   * Responsible in getting assigned
   * @param {*} req 
   * @param {*} res 
   */
  static getAssign(req,res){

    try{

      const dataContributors = TodoModel.getContributors();
      const contributors  = dataContributors.assigned;
  
      res.json(contributors);

    }catch(err){
      res.json('server error' , err);
    }

  }
}

module.exports = TodoController;