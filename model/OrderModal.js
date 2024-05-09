export default class OrderModal{

    constructor(customer, items, total,date,orderId) {
        this._customer = customer;
        this._items = items;
        this._total = total;
        this._date = date;
        this._orderId = orderId;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }
}