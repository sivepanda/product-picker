//storage for opened window
var windowStrage = window.localStorage;

//class that holds individual products
class Product {
    constructor(color, spec, price) {
        this.color = color;
        this.spec = spec;
        this.price = price;
    }
}

var product = new Product("", "", 0);

//list that contains all the products in the "cart". Saved to session storage and is reset on session end.
var cart = [];