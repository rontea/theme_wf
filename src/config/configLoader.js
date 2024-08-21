'use strict';

const path = require('path');
const ConfigLoader = require('../utils/configsets/ConfigLoader');

const mainConfig = path.join(__dirname, 'theme3Config.js');

const configLoader = new ConfigLoader({pathDefault : mainConfig});

const config = configLoader.loadConfig();

module.exports = config;
