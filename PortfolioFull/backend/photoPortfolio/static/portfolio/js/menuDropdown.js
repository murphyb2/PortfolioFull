// Get the menu button
let menuButton = document.querySelector(".menu-button"),
// menuButtonAnchor = document.querySelector(".menu-button a"),
navBox = document.querySelector(".main-nav"),
navButtons = document.querySelector(".main-nav ul"),
socialButtons = document.querySelector(".social-buttons");

// console.log(menuButtonAnchor.style.background);
// Listen for a click of the menu button and toggle the menu open/closed
menuButton.addEventListener("click", function() {
    // console.log(navButtons.style.display);
    if(navButtons.style.display != "grid"){
        navButtons.style.display = "grid";
        socialButtons.style.display = "grid";
        navBox.style.backgroundColor = '#000';
        console.log(navBox.style.backgroundColor);
        // menuButtonAnchor.style.background = "#333;";
    }
    else{
        navButtons.style.display = "none";
        socialButtons.style.display = "none";
        navBox.style.backgroundColor = "";
        console.log(navBox.style.backgroundColor);
        // menuButtonAnchor.style.background = "rgba(255, 255, 255, 0.8)";
    }
    
});