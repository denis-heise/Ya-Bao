const DISPLAY_FACE = 300;
const buttonTop = document.querySelector('.button-top');

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > DISPLAY_FACE || document.documentElement.scrollTop > DISPLAY_FACE) {
    buttonTop.style.display = "block";
  } else {
    buttonTop.style.display = "none";
  };
};

buttonTop.addEventListener('click', () => {
  document.body.scrollTo({ top: 0, behavior: 'smooth' });
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); 
});