class OrderModal{
    constructor(customerId, items, total) {
        this._customerId = customerId;
        this._items = items;
        this._total = total;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
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