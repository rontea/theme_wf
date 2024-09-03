const {format , differenceInDays, parse , addDays
        , addHours} = require('date-fns');

class DateTime{

    /** 
        yyyy-MM-dd (e.g., 2024-08-19)
        MM/dd/yyyy (e.g., 08/19/2024)
        dd/MM/yyyy (e.g., 19/08/2024)
        yyyy/MM/dd (e.g., 2024/08/19)
        MMM dd, yyyy (e.g., Aug 19, 2024)
        MMMM dd, yyyy (e.g., August 19, 2024)
        dd MMM yyyy (e.g., 19 Aug 2024)
        dd MMMM yyyy (e.g., 19 August 2024)
        MM-dd-yyyy (e.g., 08-19-2024)
        dd-MM-yyyy (e.g., 19-08-2024)
        yyyy.MM.dd (e.g., 2024.08.19)
        dd.MM.yyyy (e.g., 19.08.2024)
        EEE, MMM dd, yyyy (e.g., Mon, Aug 19, 2024)
        EEEE, MMMM dd, yyyy (e.g., Monday, August 19, 2024)
        yyyyMMdd (e.g., 20240819)
        MMddyyyy (e.g., 08192024)
        ddMMyyyy (e.g., 19082024)
        MM/dd/yy (e.g., 08/19/24)
        dd/MM/yy (e.g., 19/08/24)
        yy/MM/dd (e.g., 24/08/19)
        yyyy-MM-dd'T'HH:mm:ss (e.g., 2024-08-19T14:30:00)
        yyyy-MM-dd HH:mm:ss (e.g., 2024-08-19 14:30:00)
        MM/dd/yyyy HH:mm:ss (e.g., 08/19/2024 14:30:00)
        dd/MM/yyyy HH:mm:ss (e.g., 19/08/2024 14:30:00)

        HH:mm (e.g., 14:30)
        HH:mm:ss (e.g., 14:30:00)
        hh:mm a (e.g., 02:30 PM)
        hh:mm:ss a (e.g., 02:30:00 PM)
        HH:mm:ss.SSS (e.g., 14:30:00.123)
        HH:mm:ss.SSSZ (e.g., 14:30:00.123+0000)
        HH:mm:ss.SSSXXX (e.g., 14:30:00.123+00:00)
        HH:mm:ss Z (e.g., 14:30:00 +0000)
        HH:mm:ss XXX (e.g., 14:30:00 +00:00)
        hh:mm:ss a Z (e.g., 02:30:00 PM +0000)
        hh:mm:ss a XXX (e.g., 02:30:00 PM +00:00)
        HHmm (e.g., 1430)
        HHmmss (e.g., 143000)

        yyyy-MM-dd HH:mm:ss (e.g., 2024-08-19 14:30:00)
        yyyy-MM-dd'T'HH:mm:ss (e.g., 2024-08-19T14:30:00)
        yyyy-MM-dd'T'HH:mm:ss.SSSZ (e.g., 2024-08-19T14:30:00.123+0000)
        yyyy-MM-dd HH:mm:ss a (e.g., 2024-08-19 02:30:00 PM)
        MM/dd/yyyy HH:mm:ss (e.g., 08/19/2024 14:30:00)
        dd/MM/yyyy HH:mm:ss (e.g., 19/08/2024 14:30:00)
        yyyyMMdd HHmmss (e.g., 20240819 143000)
     */

    #date;
    #time;
    #dateFormat;
    #timeFormat;
    #getTime;
    #getDate;

     /**
     * 
     * @param {date: string , dateFormat : string, 
     *  time: string , timeFormat : string } options 
     */

    constructor(options = {}){  

        try{

            const dateNow = new Date();

            this.#getDate = options.getTime || true;
            this.#getTime = options.getDate || true;

            if(this.#getDate){
                this.#dateFormat = options.dateFormat || "yyyy-MM-dd";
                const date = options.date || this.#getDateDefault(dateNow);
                this.#date = parse(date, this.#dateFormat , dateNow);
        
                if(isNaN(this.#date)){
                    throw new Error('Invalid date format.');
                }
            }

            if(this.#getTime){
                this.#timeFormat = options.timeFormat || "HH:mm:ss";
                const time = options.time || this.#getTimeDefault(dateNow);
                this.#time = parse(time, this.#timeFormat , dateNow);;

                if(isNaN(this.#time)) {
                    throw new Error('Invalid time format.');
                }
    
            }

       
        }catch(err){
            console.log("Failed constructor ", err);
        }
        
    
    }

    setDateFormat(newStringDateFormat){
        this.#dateFormat = newStringDateFormat;
    }

    setTimeFormat(newStringTimeFormat){
        this.#timeFormat = newStringTimeFormat;
    }

    #getDateDefault(dateNow){

        const year = dateNow.getFullYear();          
        const month = (dateNow.getMonth() + 1).toString().padStart(2, '0'); 
        const day = dateNow.getDate().toString().padStart(2, '0');

        const date = `${year}-${month}-${day}`;

        return date;
    }

    #getTimeDefault(dateNow){

        const hours = dateNow.getHours().toString().padStart(2, '0');
        const minutes = dateNow.getMinutes().toString().padStart(2, '0');
        const seconds = dateNow.getSeconds().toString().padStart(2, '0');

        const time = `${hours}:${minutes}:${seconds}`;

        return time;
    }

    getDate(formatString = this.#dateFormat) {
        return format(this.#date, formatString);
    }

    getTime(formatString = this.#timeFormat) {
        return format(this.#time, formatString);
    }

    getDateTime(dateFormat = this.#dateFormat,timeFormat = this.#timeFormat){

        const formattedDate = this.getDate(dateFormat);
        const formattedTime = this.getTime(timeFormat);

        return `${formattedDate} ${formattedTime}`;
    }

    getNumDaysFromDate(date , dateFormat = this.#dateFormat) {

        const newDate = parse(date, dateFormat, new Date());
        
        if(isNaN(newDate)) {
            throw new Error('Invalid date format.');
        }
        const difference = differenceInDays(newDate, this.#date);
        
        return difference;
    }

    /**
     * Add Addtional day to date set
     * @param {int} days 
     * @returns string date
     */

    addDays(days) {
        this.#date = addDays(this.#date, days);
        return this;
    }

    /**
     * Add Addtional hours to date set
     * @param {int} hours 
     * @returns string time
     */

    addHours(hours) {
        this.#time = addHours(this.#time, hours);
        return this;
    }

}

module.exports = DateTime;