//Set definitions. These are fully editable as need by the user.
//Definitions allow the user to be able to read their spec as a JSON instead of an index in a list.
fetch('defs.json')
    .then(response => response.json())
    .then(jsonResponse => setDefs(jsonResponse));


//Local storage for opened window to allow for cart data to be avavilable across tabs.
var windowStrage = window.localStorage;

var defs;
var jsonReadyState = false;

//list that contains all the products in the "cart". Saved to session storage and is reset on session end.
if (JSON.parse(localStorage.getItem("cart")) != null) {
    var cart = [];
    cart = JSON.parse(localStorage.getItem("cart"));
} else {
    var cart = [];
}


//class that holds individual products
class Product {
    constructor(color, spec, price) {
        this.color = color;
        this.spec = spec;
        this.price = price;
    }
    getSpec() {
        return defs.products.specifications[this.spec].name; //<- AFFEECTED BY DEF
    }

    getPrice() {
        return this.price;
    }

    getColor() {
        console.log(this.color);
        return defs.products.colors[this.color].name; //<- AFFEECTED BY DEF
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

//Set defintions of products from imported JSON
function setDefs(jsonResponse) {
    console.log(jsonResponse);
    defs = jsonResponse;
    jsonReadyState = true;
    console.log(defs);
}

//add an event listener to each item picker that changes visual elements -- COLOR
function addPickerListener(item, index) {
    var id = item.parentNode.parentNode.getAttribute("id");
    var element = item.parentNode.getAttribute("id");

    image.src = "resources/" + id + "/" + element + "/" + id + "_0.png";
    document.getElementById(index.toString()).src = "resources/" + id + "/" + element + "/" + id + "_" + index + ".png";

    item.addEventListener("click", function() {
        product.color = index;
        product.price += parseInt(defs.products.colors[index].price); //            <- AFFEECTED BY DEF
        console.log("Listener " + index);

        image.src = "resources/" + id + "/products/" + id + "_" + index + ".png";
        var span = document.getElementById("dot" + index.toString());
        reset(pickerButtonsArr, "dot");
        span.style.backgroundColor = "black";
    });
}

//add an event listener to each item picker that changes visual elements -- SPECIFICATION
function addOptionListener(item, index) {
    var id = item.parentNode.parentNode.getAttribute("id");
    var element = item.parentNode.getAttribute("id");


    item.addEventListener("click", function() {
        product.spec = index;
        product.price += parseInt(defs.products.specifications[index].price); //            <- AFFEECTED BY DEF

        reset(optionButtonsArr, "option")
        document.activeElement.style.color = "white";
        document.activeElement.style.backgroundColor = "black";
    });
}

//Reset styling of options
function reset(elements, type) {
    for (var index = 0; index < elements.length; index++) {
        var span = document.getElementById(type + index.toString());
        span.style.color = "black";
        span.style.backgroundColor = "grey";
        span.style.transition = "all ease-in-out 250ms";
    }
}

//Adds current product to cart
function addToCart() {
    cart.push(product);
    console.log("Push Success.");
    console.log(cart);
    reset(pickerButtonsArr, "dot");
    reset(optionButtonsArr, "option");
    product = new Product("", "", price);
}

//Allow for the cart variable to be accessible across tabs, and open the cart in a new tab
function openCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.open('cart.html', '_blank');
}

//Format the elements in the cart into an HTML viewable CSS grid
function setCart() {
    fetch('defs.json')
        .then(response => response.json())
        .then(jsonResponse => viewCart(jsonResponse));
}

//View grid
function viewCart(jsonResponse) {
    setDefs(jsonResponse);
    if (jsonReadyState) {
        var cart = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < cart.length; i++) {
            var product = new Product(cart[i].color, cart[i].spec, cart[i].price);
            addElement("color", "Color: " + product.getColor());
            addElement("spec", "Spec: " + product.getSpec());
            addElement("price", "$" + product.price);
        }
    }
}

//Make an element block viewable in the cart
function addElement(className, textContent) {
    const newDiv = document.createElement("div");
    newDiv.className = className;
    const newContent = document.createTextNode(textContent);
    newDiv.appendChild(newContent);
    const cartContent = document.getElementById("cart-content")
    const currentDiv = document.getElementById("placeholder");
    cartContent.insertBefore(newDiv, currentDiv);
}

function clearCart() {
    var windowStrage = window.localStorage;
    windowStrage.clear();
}

//WAIT FUNCTION
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}