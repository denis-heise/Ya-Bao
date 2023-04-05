const slider = document.querySelector('.slider');
if(window.outerWidth > 1000){
    const leftBtn = slider.querySelector('.leftBtn');
    const rightBtn = slider.querySelector('.rightBtn');
    const slide = slider.querySelectorAll('.slide');

    let step = 0;
    var firstCenter = 210;
    var secondCenter = -900;
    var thirdCenter = -2010;

    if(window.outerWidth <= 1536 && window.outerWidth > 1440){
        firstCenter = 150;
        secondCenter = -952;
        thirdCenter = -2065;
    } else if(window.outerWidth <= 1440 && window.outerWidth > 1280){
        firstCenter = 130;
        secondCenter = -975;
        thirdCenter = -2085;
    } else if(window.outerWidth <= 1280 && window.outerWidth > 1200){
        firstCenter = 130;
        secondCenter = -840;
        thirdCenter = -1800;
    } else if(window.outerWidth <= 1200 && window.outerWidth > 1024){
        firstCenter = 90;
        secondCenter = -872;
        thirdCenter = -1835;
    } else if(window.outerWidth <= 1024 && window.outerWidth > 1000){
        firstCenter = 90;
        secondCenter = -673;
        thirdCenter = -1435;
    }; 

    function deleteActive (items) {
        for (const item of items) {
            item.classList.remove('activeSlider');
        };
    };

    leftBtn.addEventListener('click', function(){
        deleteActive(slide);
        if (step == 0) {
            slider.style.marginLeft = firstCenter + 'px';
            leftBtn.style.display = "none";
            slide[0].classList.add('activeSlider');
        }; 
        if (step == 1) {
            slider.style.marginLeft = secondCenter + 'px';
            rightBtn.style.display = "block";
            slide[1].classList.add('activeSlider');
            }
            step--;
    });

    rightBtn.addEventListener('click', function(){
        deleteActive(slide);
        if (step == -1) {
            slider.style.marginLeft = secondCenter + 'px';
            leftBtn.style.display = "block";
            slide[1].classList.add('activeSlider');
        };  
        if(step == 0){
            slider.style.marginLeft = thirdCenter + 'px';
            rightBtn.style.display = "none";
            slide[2].classList.add('activeSlider');
        };
        step++;
    });
} else if(window.outerWidth <= 1000){
    slider.style.display = 'none';
};