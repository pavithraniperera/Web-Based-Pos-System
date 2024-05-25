 export  default class AddedItemModal{


    constructor(name ,price ,quantity,category,description,imgSrc) {
        this._name = name;
        this._price =price;
        this._quantity = quantity;
        this._category  = category;
        this._description = description;
        this._imgSrc = imgSrc;

    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

     get imgSrc() {
         return this._imgSrc;
     }

     set imgSrc(value) {
         this._imgSrc = value;
     }
}