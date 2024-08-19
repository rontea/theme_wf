'use strict';

const IdIncrementor = require('../../src/utils/IdIncrementor');

const increment = new IdIncrementor({ propertyName : 'todos'});

const newId = increment.getNewId();

console.log(newId);

increment.checkData();