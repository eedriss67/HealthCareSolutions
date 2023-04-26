/* Java Script for the Carousel slider */

const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelector('.carousel-images');
const carouselPrev = document.querySelector('.prev');
const carouselNext = document.querySelector('.next');
const carouselPause = document.querySelector('.pause');

let currentSlide = 0;
let direction = 1;
const slides = carouselImages.children.length;
let isPaused = false;
let intervals;

function nextSlide() {
  currentSlide += direction;
  if (currentSlide >= slides) {
    direction = -1;
    currentSlide = slides - 2;
  } else if (currentSlide < 0) {
    direction = 1;
    currentSlide = 1;
  }
  carouselImages.style.transform = `translateX(-${currentSlide * 25}%)`;
}

function prevSlide() {
  currentSlide += direction;
  if (currentSlide >= slides) {
    direction = -1;
    currentSlide = slides - 2;
  } else if (currentSlide < 0) {
    direction = 1;
    currentSlide = 1;
  }
  carouselImages.style.transform = `translateX(-${currentSlide * 25}%)`;
}

function toggleCarousel() {
  if (isPaused) {
    intervals = setInterval(nextSlide, intervalTime);
    isPaused = false;
    carouselPause.innerHTML = "&#x23f8;";
  } else {
    clearInterval(intervals);
    isPaused = true;
    carouselPause.innerHTML = "&#x25b6;";
  }
}

function pauseCarousel() {
  clearInterval(intervals);
  isPaused = true;
}

function resumeCarousel() {
  if (!isPaused) {
    return;
  }
  intervals = setInterval(nextSlide, intervalTime);
  isPaused = false;
}

// Set the time interval (in milliseconds)
const intervalTime = 1500; // 1.5 seconds

// Call the nextSlide function at the specified interval
intervals = setInterval(nextSlide, intervalTime);

carouselNext.addEventListener('click', nextSlide);
carouselPrev.addEventListener('click', prevSlide);
carouselPause.addEventListener('click', toggleCarousel);
carouselImages.addEventListener('mouseover', pauseCarousel);
carouselImages.addEventListener('mouseout', resumeCarousel);






/*Back to top button events Listener*/
var btn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

btn.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});






/*--Footer events Listener*/
window.onscroll = function() {
  var windowHeight = window.innerHeight;
  var documentHeight = document.body.scrollHeight;
  var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  if (windowHeight + scrollPosition >= documentHeight) {
    document.getElementById("my-footer").style.display = "block";
  } else {
    document.getElementById("my-footer").style.display = "none";
  }
}


