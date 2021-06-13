var image = document.getElementById("carousel");
var pickerButtons = document.getElementsByClassName("dot");
image.src = "resources/100/100_0.png";

var pickerButtonsArr = Array.from(pickerButtons);

pickerButtonsArr.forEach(addPickerListener);

function addPickerListener(item, index) {
    document.getElementById(index.toString()).src = "resources/100/100_" + index + ".png";
    item.addEventListener("click", function() {
        image.src = "resources/100/100_" + index + ".png";
    });
}