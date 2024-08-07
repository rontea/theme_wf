'use strict'

const path = require('path');

class PathFile {

    #paths;
    #dirName;

    constructor(paths = []) {
        this.#paths = paths || ['' , ''];
        this.#dirName = __dirname;
    }

    pathJoinDirName(paths = ['' , '']) {

        this.#paths = this.#paths || paths;
        const join = path.join(this.#dirName, this.#paths);

        return join;
    }

    getPathInfo(){

        console.log("DIR name :" , this.#dirName);
        console.log("Paths" , this.#paths);
    }

    getPath() {
        return this.#paths;
    }

}

const pathFile = new PathFile();
Object.freeze(pathFile);

module.exports = pathFile;