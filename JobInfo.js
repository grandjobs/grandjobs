/**
 * Class that will be used for storing all of the info for the job.
 */
export default class JobInfo{
    constructor(){
        this.jobKey = "";
        this.company = "";
        this.jobTitle = "";
        this.distance = -1;
        this.skills = [];
        this.description = [];
        //Company location
        this.lat = 0;
        this.long = 0;
        this.address = "";
        this.busDistance = -1;
        this.busDescrip = "";
        this.busLine = -1;
        this.busLat = 0;
        this.busLong = 0;
        this.longBusDescrip = "";
        this.matchPercent = 0;
    }
}
