//Set definitions. These are fully editable as need by the user.
//Definitions allow the user to be able to read their spec as a JSON instead of an index in a list.
fetch('defs.json')
    .then(response => response.json())
    .then(jsonResponse => setDefs(jsonResponse, doButtons));


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
        return defs.products.specifications[this.spec].name;
    }

    getPrice() {
        return this.price;
    }

    getColor() {
        console.log(this.color);
        return defs.products.colors[this.color].name;
    }
}

//product info for cart
var price = 0;
var product = new Product("", "", price);

//set html elements to vars
var image = document.getElementById("carousel");

//instantiate button clusters that get filled later on
var pickerButtonsArr = [];
var optionButtonsArr = [];

//Set defintions of products from imported JSON
function setDefs(jsonResponse, doButtons) {
    console.log(jsonResponse);
    defs = jsonResponse;
    jsonReadyState = true;
    console.log(defs);
    if (doButtons) {
        setButtons(defs);
    }
}

//create buttons for each varient specified in defs.json
function setButtons(definitions) {
    const colorDiv = document.getElementById("colors");
    const specDiv = document.getElementById("spec");
    for (var i = 0; i < definitions.products.colors.length; i++) {
        var newSpan = document.createElement("span");
        newSpan.className = "dot";
        newSpan.id = "dot" + i;
        pickerButtonsArr.push(newSpan);
        const currentDiv = document.getElementById("placeholder-colors");
        colorDiv.insertBefore(newSpan, currentDiv);
    }
    for (var i = 0; i < definitions.products.specifications.length; i++) {
        var newSpan = document.createElement("button");
        newSpan.className = "specBtn";
        newSpan.id = "option" + i;
        optionButtonsArr.push(newSpan);
        const currentDiv = document.getElementById("placeholder-spec");
        specDiv.insertBefore(newSpan, currentDiv);
    }
    pickerButtonsArr.forEach(addPickerListener);
    optionButtonsArr.forEach(addOptionListener);

}

//add an event listener to each item picker that changes visual elements -- COLOR
function addPickerListener(item, index) {
    var id = item.parentNode.parentNode.getAttribute("id");
    var element = item.parentNode.getAttribute("id");

    image.src = "resources/" + id + "/" + element + "/" + id + "_0.png";
    document.getElementById("dot" + index).innerHTML = "<image class='dotimg' id='index' src='resources/" + id + "/" + element + "/" + id + "_" + index + ".png'></image>";

    item.addEventListener("click", function() {
        product.color = index;
        product.price += parseInt(defs.products.colors[index].price);
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

    document.getElementById("option" + index).innerHTML = "<h2>" + defs.products.specifications[index].name + "</h2><br>" + defs.products.specifications[index].description;

    item.addEventListener("click", function() {
        product.spec = index;
        product.price += parseInt(defs.products.specifications[index].price);
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
    setDefs(jsonResponse, false);
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
    const cartContent = document.getElementById("cart-content");
    const currentDiv = document.getElementById("placeholder-cart");
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