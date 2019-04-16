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
    }
}
