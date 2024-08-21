'use strict';

const path = require('path');

const config = {

    paths : {
        mainFolder : process.cwd(),
        todoJsonFile: path.join(__dirname, '../data/todos.json'),
        todoMdFile: path.join(__dirname, '../../TODO.md')
    }

}

module.exports = config;