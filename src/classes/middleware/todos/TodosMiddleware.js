'use strict';

class TodosMiddleware{

    /**
     * Validate the input data of Contributors
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static validateContributors(req,res,next){

        const { name , alias} = req.body;

        if(name.length < 3 && alias.value < 3 ) {
            return res.status(400).json({ message: 'Name or Alias must be at least 3 characters long.' });
        }

        next();
    }

}

module.exports = TodosMiddleware;