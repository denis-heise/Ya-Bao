const bodyPage = document.querySelector('body');
const bigInput = document.querySelector('.ordering-first-block__big-input');
const textInput = bigInput.querySelector('input');
const textAddress = bigInput.querySelector('textarea');
const buttonСhange = document.querySelectorAll('.change');
const inputEadio = document.querySelectorAll('.ordering-second-block__radio');
const paymentBlock = document.querySelector('.ordering-second-block__payment-block');
const numberCard = paymentBlock.querySelector('.ordering-second-block__number-card');
const dateCard = paymentBlock.querySelector('.ordering-second-block__date-card');
const cvcCard = paymentBlock.querySelector('.ordering-second-block__cvc-card');
const detailsReport = document.querySelector('.ordering-third-block__details-report');
const rhombus = document.querySelector('.ordering-third-block__rhombus');
const popup = document.querySelector('.ordering-third-block__popup');
const timeBlock = document.querySelector('.ordering-first-block__time-block');
const wrapperOrder = document.querySelector('.wrapper-time')
const closeButtonTime = timeBlock.querySelector('.ordering-first-block__close-img');
const pickupStore = document.querySelector('.pickup');
const timeDivs = timeBlock.querySelectorAll('.ordering-first-block__time-divs');
const selectedTime = document.querySelector('.time');

textAddress.textContent = 'ул. КИМа, д. 1, под. Последний, эт. Последний, кв. 22, код Домофон';

function checkInput (element){
    element.addEventListener('click', function(){
        const blockInput = element.closest('.block-input');
        const inputSmal = blockInput.querySelector('.ordering-first-block__smal-input');
        const textarea = blockInput.querySelector('textarea');

        if(inputSmal.classList.contains('edit')){
            textInput.value = 'Дом';
            textAddress.textContent = 'ул. КИМа, д. 1, под. Последний, эт. Последний, кв. 22, код Домофон';
            if(textarea){
                const end = textarea.value.length;
                blockInput.classList.add('input-active');
                inputSmal.style.background = '#fff';
                textarea.style.background = '#fff';
                textarea.removeAttribute('disabled');
                textarea.focus();       
                textarea.setSelectionRange(end, end);
            } else {
                inputSmal.removeAttribute('disabled');
                inputSmal.classList.add('input-active');
                inputSmal.focus();
                inputSmal.selectionStart = inputSmal.value.length;
            };
        } else if (inputSmal.classList.contains('time')){
            timeBlock.style.display = 'block';
            timeBlock.style.zIndex = '1';
            wrapperOrder.style.opacity = '1';
            wrapperOrder.style.zIndex = '1';
            bodyPage.classList.add('stop-scrolling');
        };
    });
};

function checkBlock (element){
    element.addEventListener('click', function(){
        const radio1 = element.querySelector('#radio_1');
        const radio2 = element.querySelector('#radio_2');
    
        if(radio2){
            numberCard.setAttribute('disabled', true);
            dateCard.setAttribute('disabled', true);
            cvcCard.setAttribute('disabled', true);
            numberCard.removeAttribute('required');
            dateCard.removeAttribute('required');
            cvcCard.removeAttribute('required');

            numberCard.classList.remove('acriveBackground');
            dateCard.classList.remove('acriveBackground');
            cvcCard.classList.remove('acriveBackground');
            numberCard.classList.add('disabledBackground');
            dateCard.classList.add('disabledBackground');
            cvcCard.classList.add('disabledBackground');
        } else if (radio1){
            numberCard.removeAttribute('disabled');
            dateCard.removeAttribute('disabled');
            cvcCard.removeAttribute('disabled');
            numberCard.setAttribute('required', true);
            dateCard.setAttribute('required', true);
            cvcCard.setAttribute('required', true);

            numberCard.classList.remove('disabledBackground');
            dateCard.classList.remove('disabledBackground');
            cvcCard.classList.remove('disabledBackground');
            numberCard.classList.add('acriveBackground');
            dateCard.classList.add('acriveBackground');
            cvcCard.classList.add('acriveBackground');
        };
    });
};

function inputCard (input) {
    let formatPos = function(char, backspace) {
        let start = 0;
        let end = 0;
        let pos = 0;
        let separator = input.classList.contains('ordering-second-block__date-card') ? "/" : " ";
        let value = input.value;

        if (char !== false) {
            start = input.selectionStart;
            end = input.selectionEnd;

            if (backspace && start > 0)  /* handle backspace onkeydown */ {
                start--;
                if (value[start] == separator) { 
                    start--; 
                };
            };
            // To be able to replace the selection if there is one
            value = value.substring(0, start) + char + value.substring(end);
            pos = start + char.length; // caret position
        };

        let d = 0; // digit count
        let dd = 0; // total
        let gi = 0; // group index
        let newV = "";

        if(input.classList.contains('ordering-second-block__date-card')){
            let groups = [2, 2];
            sortNumbers(groups);
        } else if(input.classList.contains('ordering-second-block__number-card')){
            let groups = [4, 4, 4, 4];
            sortNumbers(groups);
        } else{
            let groups = [3];
            sortNumbers(groups);
        };

        function sortNumbers (groups){
            for (let i = 0; i < value.length; i++) {
                if (/\D/.test(value[i])) {
                    if (start > i) { 
                        pos--; 
                    };
                } else {
                    if (d === groups[gi]) {
                        newV += separator;
                        d = 0;
                        gi++;
    
                        if (start >= i) { 
                            pos++; 
                        }
                    };
                    newV += value[i];
                    d++;
                    dd++;
                };
                if (d === groups[gi] && groups.length === gi + 1)  /* max length */{ 
                    break; 
                };
            };
        };
        input.value = newV;

        if (char !== false) { 
            input.setSelectionRange(pos, pos); 
        };
    };

    input.addEventListener('keypress', function(e) {
        let code = e.charCode || e.keyCode || e.which;
        // Check for tab and arrow keys (needed in Firefox)
        if (code !== 9 && (code < 37 || code > 40) &&
        // and CTRL+C / CTRL+V
        !(e.ctrlKey && (code === 99 || code === 118))) {
            e.preventDefault();
            let char = String.fromCharCode(code);
            formatPos(char);
        };
    });
    
    // backspace doesn't fire the keypress event
    input.addEventListener('keydown', function(e) {
        if (e.keyCode === 8 || e.keyCode === 46) /* backspace or delete */ {
            e.preventDefault();
            formatPos('', this.selectionStart === this.selectionEnd);
        };
    });
    
    input.addEventListener('paste', function() {
        // A timeout is needed to get the new value pasted
        setTimeout(function(){ formatPos(''); }, 50);
    });
    
    input.addEventListener('blur', function() {
    	// reformat onblur just in case (optional)
        formatPos(this, false);
    });
};
inputCard(numberCard);
inputCard(dateCard);
inputCard(cvcCard);

for (let i = 0; i < buttonСhange.length; i++){
    checkInput(buttonСhange[i]);
};

for (let i = 0; i < inputEadio.length; i++){
    checkBlock(inputEadio[i]);
};

detailsReport.addEventListener('click', function(){
    rhombus.classList.toggle('active');    
    popup.classList.toggle('active');
    popup.addEventListener('mouseleave', function(){
        rhombus.classList.remove('active');    
        popup.classList.remove('active');
    });
});
closeButtonTime.addEventListener('click', function(){
    timeBlock.style.display = 'none';
    timeBlock.style.zIndex = '-1';
    wrapperOrder.style.opacity = '0';
    wrapperOrder.style.zIndex = '-1';
    bodyPage.classList.remove('stop-scrolling');

    wrapperAddress.style.zIndex = '-1';
    wrapperAddress.style.opacity = '0';
});

function selectTime (element){
    element.addEventListener('click', function(){
        for (let i = 0; i < timeDivs.length; i++){
            timeDivs[i].classList.remove('time-select')
        }
        element.classList.add('time-select');
        selectedTime.value = element.textContent;
    })
};

for (let i = 0; i < timeDivs.length; i++){
    selectTime(timeDivs[i]);
};

pickupStore.addEventListener('click', function(){
    const blockInput = pickupStore.closest('.block-input');
    const inputSmal = blockInput.querySelector('.ordering-first-block__smal-input');
    const textarea = blockInput.querySelector('textarea');
    
    textInput.value = 'Магазин';
    textAddress.textContent = 'Адрес магазина';

    if(blockInput.classList.contains('input-active')){
        blockInput.classList.remove('input-active');
        inputSmal.style.background = '#E3ECF5';
        textarea.style.background = '#E3ECF5';
        textarea.setAttribute('disabled', true);
    }
});