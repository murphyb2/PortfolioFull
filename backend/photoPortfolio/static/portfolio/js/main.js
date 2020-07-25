//When all the images and static files and page elements finish loading, do some stuff
window.onload = function(){
  //Get the DOM elements for the loading spinners
  let spinners = document.querySelectorAll(".spinner");
  for (let i = 0; i < spinners.length; i++){
    spinners[i].style.display = "none";
  }

};

// Handles the image slider on the home page

let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector(".previous"),
  arrowRight = document.querySelector(".next"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[current].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();
