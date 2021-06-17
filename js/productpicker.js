//storage for opened window
var windowStrage = window.localStorage;

//list that contains all the products in the "cart". Saved to session storage and is reset on session end.
var cart = [];

//class that holds individual products
class Product {
    constructor(color, spec, price) {
        this.color = color;
        this.spec = spec;
        this.price = price;
    }
}

//product info for cart
var price = 0;
var product = new Product("", "", price);

//set html elements to vars
var image = document.getElementById("carousel");
var pickerButtons = document.getElementsByClassName("dot");
var optionButtons = document.getElementsByClassName("specBtn");

//convert the buttons HTMLCollection to a conventional list and add event listeners to each
var pickerButtonsArr = Array.from(pickerButtons);
var optionButtonsArr = Array.from(optionButtons);

pickerButtonsArr.forEach(addPickerListener);
optionButtonsArr.forEach(addOptionListener);

//add an event listener to each item picker that changes visual elements
function addPickerListener(item, index) {
    var id = item.parentNode.parentNode.getAttribute("id");
    var element = item.parentNode.getAttribute("id");

    product.color = id;
    price += index * 10;

    image.src = "resources/" + id + "/" + element + "/" + id + "_0.png";
    document.getElementById(index.toString()).src = "resources/" + id + "/" + element + "/" + id + "_" + index + ".png";

    item.addEventListener("click", function() {
        image.src = "resources/" + id + "/products/" + id + "_" + index + ".png";
        var span = document.getElementById("dot" + index.toString());
        reset(pickerButtonsArr, "dot");
        span.style.backgroundColor = "black";
    });
}

//add an event listener to each item picker that changes visual elements
function addOptionListener(item, index) {
    var id = item.parentNode.parentNode.getAttribute("id");
    var element = item.parentNode.getAttribute("id");
    product.spec = element;

    price += index * 20;

    item.addEventListener("click", function() {
        optionIndex = index;
        reset(optionButtonsArr, "option")
        document.activeElement.style.color = "black";
        document.activeElement.style.backgroundColor = "white";
    });
}

//reset styling of options
function reset(elements, type) {
    for (var index = 0; index < elements.length; index++) {
        var span = document.getElementById(type + index.toString());
        span.style.color = "black";
        span.style.backgroundColor = "grey";
        span.style.transition = "all ease-in-out 250ms";
    }
}

function addToCart() {
    cart.append(product);
    localStorage.push('products', JSON.stringify(cart));
}