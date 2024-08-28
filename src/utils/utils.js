const { execSync } = require('child_process');

class utils {

    /**
     * Add 0 on int will result to 1 = 01
     * @param {int} number 
     * @returns padded int
     */
    static padZero(number) {
        try{
            return (number >= 0 || number < 10 ? '0' : '') + number;
        }catch(err){
            console.log(err);
        }
       
    }
    /**
     * Get branch , trim branch of spaces and make sure the / is replace to -
     * @returns current git branch
     */
    static getCurrentBranch() {

        try {
            const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' });
            const branchUrl = this.stripUrl(branch.trim());
            
            return branchUrl;
            
        } catch (error) {
            console.error('Error getting current branch:', error);
            return null;
        }

    }

    /**
     * Tranform string with / to -
     * @param {string} url 
     * @returns transfirmed string
     */
    static stripUrl(url){
        const transformedString = url.replace("/", "-");
        return transformedString; 
    }

    /**
     * Covert to string and perform to lowercase
     * @param {anytype} value 
     * @returns 
     */
    
    static toLowerCaseTypeSafe(value) {

        const lowerCaseValue = String(value).toLowerCase();
        return lowerCaseValue;
    }

    /**
     * Covert to string and perform to uppercase
     * @param {anytype} value 
     * @returns 
     */
    
    static toUpperCaseTypeSafe(value) {

        const upperCaseValue = String(value).toUpperCase();
        return upperCaseValue;
    }

    /**
     * 
     * @param {array} array 
     * @returns boolean
     */
    static isArrayEmpty(array){
        return array.length === 0;
    }
    /**
     * 
     * @param {array} array 
     * @returns boolean
     */
    static isArray(array){
        return Array.isArray(array);
    }

    static stringsToArray(string) {
        // split in array
        let stringTranformArray = string.split('\n');
        // trim
        stringTranformArray = stringTranformArray.map(item => item.trim().replace(/\s+/g, ''));
        // filter empty string
        const sanitize = stringTranformArray.filter(item => item);
        
        return sanitize;
    }

    /**
     * Check if format is === [sample](www.link)
     * @param {*} string 
     * @returns boolean
     */
    static isGitDocLink(string) {
        const regex = /^\[.+\]\(.+\)$/;

        const isGitHubLinkValidFormat = regex.test(string);

        return isGitHubLinkValidFormat;
    }

    static isObjectAvailable(data){

        if(data){
            return true;
        }else{
            return false;
        }

    }

}

module.exports = utils;