// Get DOM Elements
const modal = document.querySelector('.modal-window');
const closeBtn = document.querySelector('.close');

// Events
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', outsideClick);

// Open
function openModal(count) {
    console.log(count);
    modal.style.display = 'grid';

    // forloop.counter starts at 1 so pass 1 less than count to startSlide
    current = count - 1;
    // console.log(current);
    startSlide();
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
