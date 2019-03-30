/*
A class that is used to create an object that will hold all information that the
user gives the application
 */
export default class UserInfo{

    /**
     * Constructor used for initializing all fields to blanks.
     */
    constructor(){
        this.phoneNum = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.skills = [];
        this.busAccess = [];
        this.homeRange = 0;
        this.homeLat = 0.0;
        this.homeLong = 0.0;
    }
}
