'use strict';

const fs = require('fs');
const currentTime = require('./CreateTime');

class ErrorLogger {

    #logDir;
    #logFile;

    constructor(options = {}) {

        this.#logDir  = options.dir || "./logs";
        this.#logFile = options.file || "./logs/log.log"; 
    }
    /**
     * Write to file specified in logFile and create DIR specified in logDir
     * @param {string} logMessage
     
        name: Error name
        message: Error message
        stack: Stack trace
        cwd: Current working directory
        nodeVersion: Node.js version
        timestamp: Timestamp of the error
        environment:  Environment (development, staging, production)
        url: URL where the error occurred (for client-side)
        user:  User details
        request:  HTTP request details (for server-side)
        session: User session details
        memoryUsage:  Memory usage
        appState: Custom application state
        metadata: Custom metadata

     */
    writeLog(logMessage , metadata = {}) {

        const errorDetails = {
            name: logMessage.name,
            message: logMessage.message,
            stack: logMessage.stack,
            cwd: process.cwd(),
            nodeVersion: process.version,
            timestamp: currentTime.getTime(),
            environment: process.env.NODE_ENV,
            url: logMessage.url,
            user: logMessage.user,
            request: logMessage.request,
            session: logMessage.session,
            memoryUsage: process.memoryUsage(),
            appState: logMessage.appState,
            metadata
            
        }

        const formattedLog = `\n${JSON.stringify(errorDetails, null, 2)}\n`;

        try {

            if(!fs.existsSync(this.#logDir)) {
                this.#mkDir();
                console.log("Create DIR " , this.#logDir );
            } 
       
            fs.appendFile(this.#logFile, formattedLog, (err) => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }else {
                    console.log("Error catch writeline new entry " , this.#logFile);
                }
            });


        }catch(err) {
            console.log("writeLog error ", err);
        }

    }

   /**
    * This will create the directory of the log file
    */

    #mkDir() {

        try {
            fs.mkdirSync(this.#logDir , (err) => {
                if(err) {
                    console.error('Error Creating DIR:', err);
                }else {
                    console.log("mkdir " , this.#logDir);
                }
            });
        }catch(err) {
            console.log("Directory log creation error ", err);
        }
       
    }

    /**
     * Returns the time string
     * @returns string
     */

    getTime() {
        return currentTime.getTime();
    }

} 

const logErr = new ErrorLogger();
Object.freeze(logErr);

module.exports = {logErr, ErrorLogger};