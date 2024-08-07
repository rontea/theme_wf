'use strict';

const fs = require('fs');
const path = require('path');

class IdIncrementor {

    #filePath;
    #rawData;

    constructor(options = {}) {

        

        this.#filePath = options.filePath 
            || path.join(__dirname,  '..' , '..' , 'todos.json');

        console.log(this.#filePath);
    }

}

module.exports = IdIncrementor;