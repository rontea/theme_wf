const { execSync } = require('child_process');

class utils {
    static padZero(number) {
        try{
            return (number >= 0 || number < 10 ? '0' : '') + number;
        }catch(err){
            console.log(err);
        }
       
    }

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

    static stripUrl(url){
        const transformedString = url.replace("/", "-");
        return transformedString; 
    }

    static isArrayEmpty(array){
        return array.length === 0;
    }

    static isArray(array){
        return Array.isArray(array);
    }
}

module.exports = utils;