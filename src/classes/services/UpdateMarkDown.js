'use strict';
const fs = require('fs');
const path = require('path');

class UpdateMarkDown {

    #mdFilePath;
    #unicodeFormat;
    #content;

    constructor(options = {}){

        this.#mdFilePath = options.filePath || path.join(__dirname, 'TODO.md');
        this.#unicodeFormat = options.unicodeFormat || 'utf8';
        this.#content = options.content;
        
        
        
    }

    /**
     *  Write to file
     */
    todoFileWrite(content =  this.#content){
        try {
            this.#content = content;
            fs.writeFileSync(this.#mdFilePath , this.#content , this.#unicodeFormat);

        }catch(err){
            console.log("Todo file write error", err );
        }

    }
}

module.exports = UpdateMarkDown;