export default class OrderModal{
    constructor(customer, items, total) {
        this._customerId = customer;
        this._items = items;
        this._total = total;
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
}