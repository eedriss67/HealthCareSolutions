/* Java Script for the Carousel slider */
const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelector('.carousel-images');
const carouselPrev = document.querySelector('.prev');
const carouselNext = document.querySelector('.next');

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-images img').length;

function nextSlide() {
  currentSlide++;
  carouselImages.style.transition = 'transform 0.4s ease-in-out';
  carouselImages.style.transform = `translateX(-${currentSlide * 25}%)`;

  // Reset to first slide if we've reached the end of the carousel
  if (currentSlide >= totalSlides) {
    setTimeout(() => {
      carouselImages.style.transition = 'none';
      carouselImages.style.transform = 'translateX(0)';
      currentSlide = 0;
    });
  }
}

function prevSlide() {
  currentSlide--;
  carouselImages.style.transition = 'transform 0.4s ease-in-out';
  carouselImages.style.transform = `translateX(-${currentSlide * 25}%)`;

  // Move to last slide if we've reached the beginning of the carousel
  if (currentSlide <= totalSlides) {
    setTimeout(() => {
      carouselImages.style.transition = 'none';
      carouselImages.style.transform = `translateX(-${currentSlide  * 25}%)`;
      currentSlide = totalSlides;
    });
  }
}

// Set the time interval (in milliseconds)
const intervalTime = 1500; // 1.5 seconds

// Call the nextSlide function at the specified interval
setInterval(nextSlide, intervalTime);

carouselNext.addEventListener('click', nextSlide);
carouselPrev.addEventListener('click', prevSlide);








/*const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelector('.carousel-images');
const carouselPrev = document.querySelector('.prev');
const carouselNext = document.querySelector('.next');

let currentSlide = 0;

function nextSlide() {
  currentSlide++;
  if (currentSlide > 3) {
    currentSlide = 0;
  }
  carouselImages.style.transform = `translateX(-${currentSlide * 25}%)`;
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = 3;
  }
  carouselImages.style.transform = `translateX(-${currentSlide * 25}%)`;
}

// Set the time interval (in milliseconds)
const intervalTime = 1500; // 1.5 seconds

// Call the nextSlide function at the specified interval
setInterval(nextSlide, intervalTime);

carouselNext.addEventListener('click', nextSlide);
carouselPrev.addEventListener('click', prevSlide);*/






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


