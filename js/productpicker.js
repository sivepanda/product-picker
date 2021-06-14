var image = document.getElementById("carousel");
var pickerButtons = document.getElementsByClassName("dot");

var pickerButtonsArr = Array.from(pickerButtons);

pickerButtonsArr.forEach(addPickerListener);

function addPickerListener(item, index) {
    var parentDiv = item.parentNode;
    var id = parentDiv.getAttribute("id");
    image.src = "resources/" + id + "/colors/" + id + "_0.png";
    document.getElementById(index.toString()).src = "resources/" + id + "/colors/" + id + "_" + index + ".png";

    item.addEventListener("click", function() {
        image.src = "resources/" + id + "/products/" + id + "_" + index + ".png";
        var span = document.getElementById("(" + index.toString() + ")");
        pickerButtonsArr.forEach(reset);
        span.setAttribute("style", "background-color:black");
    });
}

function reset(item, index) {
    var span = document.getElementById("(" + index.toString() + ")");
    span.setAttribute("style", "background-color:grey");
}