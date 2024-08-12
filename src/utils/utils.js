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
            return branch.trim();
        } catch (error) {
            console.error('Error getting current branch:', error);
            return null;
        }

    }
}

module.exports = utils;