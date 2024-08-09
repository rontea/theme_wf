
class utils {
    static padZero(number) {
        try{
            return (number < 10 ? '0' : '') + number;
        }catch(err){
            console.log(err);
        }
       
    }
}

module.exports = utils;