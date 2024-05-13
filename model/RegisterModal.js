export default class RegisterModal{
    constructor(userName,password) {
       this._userName = userName;
       this._password = password;

    }



    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}