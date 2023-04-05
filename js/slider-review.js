if(window.outerWidth < 770){
  const partReview = document.querySelector('.block-review__part-review');
  let slider = document.querySelector('.slider-review');
  let sliderTrack = slider.querySelector('.slider-track');
  let slides = slider.querySelectorAll('.block-review__one');
  let arrows = slider.querySelector('.slider-arrows');
  let prev = arrows.children[0];
  let next = arrows.children[1];
  let slideWidth = slides[0].offsetWidth;
  let slideIndex = 0;
  let posInit = 0;
  let posX1 = 0;
  let posX2 = 0;
  let posY1 = 0;
  let posY2 = 0;
  let posFinal = 0;
  let isSwipe = false;
  let isScroll = false;
  let allowSwipe = true;
  let transition = true;
  let nextTrf = 0;
  let prevTrf = 0;
  let lastTrf = --slides.length * slideWidth;
  let posThreshold = slides[0].offsetWidth * 0.35;
  let trfRegExp = /([-0-9.]+(?=px))/;

  let getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  };
  let slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    };    
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);
  };
  let swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      transition = true;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

    };
  };
  let swipeAction = function(e) {  
    let evt = getEvent();
    style = sliderTrack.style.transform;
    transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    // определение действия свайп или скролл
    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      };
    };

    if (isSwipe) {
      // запрет ухода влево на первом слайде
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        };
      };

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        };
      };

      // запрет протаскивания дальше одного слайда
       if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      };

      // двигаем слайд
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  };
  let swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);


    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if(posInit > posX1 && window.outerWidth <= 768 && window.outerWidth > 540 && slideIndex * slideWidth < 201){
          slideIndex++;
        } else if(posInit > posX1 && window.outerWidth <= 540 && window.outerWidth > 414 && slideIndex * slideWidth < 250){
          slideIndex++;
        } else if(posInit > posX1 && window.outerWidth <= 414 && window.outerWidth > 393 && slideIndex * slideWidth < 321){
          console.log(slideIndex * slideWidth)
          slideIndex++;
        } else if(posInit > posX1 && window.outerWidth <= 393 && window.outerWidth > 375 && slideIndex * slideWidth < 321){
          console.log(slideIndex * slideWidth)
          slideIndex++;
        } else if(posInit > posX1 && window.outerWidth <= 375 && window.outerWidth > 360 && slideIndex * slideWidth < 401){
          slideIndex++;
        } else if(posInit > posX1 && window.outerWidth <= 360 && window.outerWidth > 280 && slideIndex * slideWidth < 401){
          slideIndex++;
        } else if(posInit > posX1 && window.outerWidth <= 280 && slideIndex * slideWidth < 481){
          slideIndex++;
        }; 
      };

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      };

    } else {
      allowSwipe = true;
    };
  };
  let setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      };
    };
    allowSwipe = false;
  };
  let reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';

  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart);

  arrows.addEventListener('click', function(evt) {
    let target = evt.target;
    if (target.classList.contains('next')) {
      if(window.outerWidth <= 768 && window.outerWidth > 540 && slideIndex * slideWidth < 201){
        slideIndex++;
      } else if(window.outerWidth <= 540 && window.outerWidth > 414 && slideIndex * slideWidth < 250){
        slideIndex++;
      } else if(window.outerWidth <= 414 && window.outerWidth > 393 && slideIndex * slideWidth < 321){
        slideIndex++;
      } else if(window.outerWidth <= 393 && window.outerWidth > 375 && slideIndex * slideWidth < 321){
        slideIndex++;
      } else if(window.outerWidth <= 375 && window.outerWidth > 360 && slideIndex * slideWidth < 401){
        slideIndex++;
      } else if(window.outerWidth <= 360 && window.outerWidth > 280 && slideIndex * slideWidth < 401){
        slideIndex++;
      } else if(window.outerWidth <= 280 && slideIndex * slideWidth < 481){
        slideIndex++;
      }; 
    } else if (target.classList.contains('prev')) {
      slideIndex--;
    } else {
      return;
    };

    slide();
  });
  partReview.style.display = 'none';



  function getTouch(e) {
    return {
      get x() {
        return e.changedTouches[0].pageX
        },
      get y() {
        return e.changedTouches[0].pageY
      }
    };
  };
  getTouch();
};