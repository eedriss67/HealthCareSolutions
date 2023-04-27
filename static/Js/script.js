/* Java Scripts for Back to top button events Listener*/
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


