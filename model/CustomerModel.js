 export  default class CustomerModel{

    constructor(id,name,contact,address,note) {
        this._id =id;
        this._name= name;
        this._contact = contact;
        this._address=address;
        this._note = note;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }
}