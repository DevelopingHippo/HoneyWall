
function changeColor() {
    // Generating random color each time
    let color = "#" + (Math.random() * 16777215 | 0).toString(16);

    $("body").css("background-color", color);
}