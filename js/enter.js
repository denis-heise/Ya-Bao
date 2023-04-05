const AMOUNT_NUMBER_PHONE_ENTER = 15;
const AMOUNT_NUMBER_CODE_ENTER = 4;
const KEY_ENTER = 13;
const enterButton = document.querySelector('.header-content__enter');
const blockEnterWrapper = document.querySelector('.block-enter__wrapper');
const closeButton = blockEnterWrapper.querySelector('.block-enter__img-close');
const phoneNumber = blockEnterWrapper.querySelector('.block-enter__phone-number');
const codeButton = blockEnterWrapper.querySelector('.block-enter__button-code');
const firstStepBlock = blockEnterWrapper.querySelector('.block-enter__first-step');
const secondStepBlock = blockEnterWrapper.querySelector('.block-enter__second-step');
const blockCode = blockEnterWrapper.querySelector('.block-enter__code');
const numberTelFirst = blockEnterWrapper.querySelector('#number-tel-first-block');
const numberTelSecond = blockEnterWrapper.querySelector('#number-tel-second-block');
const buttonChangeNumber = document.querySelector('#change-number-tel');
const blockError = blockEnterWrapper.querySelector('.error-body');
const errorText = blockError.querySelector('.error-block__text');
const blockRhombus = blockEnterWrapper.querySelector('.error__rhombus');
const buttonNewCode = blockEnterWrapper.querySelector('#new-code');

enterButton.addEventListener('click', function(){
  blockEnterWrapper.style.zIndex = 2000;
  blockEnterWrapper.style.opacity = 1;
  closeButton.style.zIndex = 2000;
  phoneNumber.removeAttribute('disabled')
});

closeButton.addEventListener('click', function(){
  blockEnterWrapper.style.zIndex = -1;
  blockEnterWrapper.style.opacity = 0;
  closeButton.style.zIndex = -1;
});

phoneNumber.addEventListener('keyup', function(e){
  phoneNumber.addEventListener('keydown', function(){
    blockError.style.opacity = 0;
    blockRhombus.style.opacity = 0;            
    blockError.style.zIndex = -5;
    blockRhombus.style.zIndex = -5;
  });

  if (phoneNumber.value.length > AMOUNT_NUMBER_PHONE_ENTER && e.keyCode == KEY_ENTER){
    firstStepBlock.style.display = 'none';
    secondStepBlock.style.display = 'block';
    phoneNumber.setAttribute('disabled', 'disabled');
    blockError.style.top = '235px';
    blockRhombus.style.top = '230px';
    errorText.textContent = "Неверный код";
    numberTelSecond.value = numberTelFirst.value;    
  }; 
  if (phoneNumber.value.length < AMOUNT_NUMBER_PHONE_ENTER && e.keyCode == KEY_ENTER){
    blockError.style.opacity = 1;
    blockRhombus.style.opacity = 1;            
    blockError.style.zIndex = 1;
    blockRhombus.style.zIndex = 1;
    blockError.style.top = '155px';
    blockRhombus.style.top = '151px';
    errorText.textContent = "Неверный номер";
  };
  codeButton.addEventListener('click', function(){
    if (phoneNumber.value.length > AMOUNT_NUMBER_PHONE_ENTER){
        firstStepBlock.style.display = 'none';
        secondStepBlock.style.display = 'block';
        phoneNumber.setAttribute('disabled', 'disabled');
        numberTelSecond.value = numberTelFirst.value;    
    } else {
        blockError.style.opacity = 1;
        blockRhombus.style.opacity = 1;            
        blockError.style.zIndex = 1;
        blockRhombus.style.zIndex = 1;
        blockError.style.top = '155px';
        blockRhombus.style.top = '151px';
        errorText.textContent = "Неверный номер";
    };
  });
});

blockCode.addEventListener('input', function() {
  blockCode.value = blockCode.value.replace(/[^0-9]/g, "");
  if(blockCode.value.length == 4){
      blockCode.setAttribute('disabled', 'disabled');

    setTimeout(function(){
      window.location.href = './account.html';
    }, 1500);
  };
});

blockCode.addEventListener('keydown', function(e) {
  blockError.style.opacity = 0;
  blockRhombus.style.opacity = 0;            
  blockError.style.zIndex = -5;
  blockRhombus.style.zIndex = -5;
  
  if (blockCode.value.length < AMOUNT_NUMBER_CODE_ENTER && e.keyCode == KEY_ENTER){
    blockError.style.opacity = 1;
    blockRhombus.style.opacity = 1;            
    blockError.style.zIndex = 1;
    blockRhombus.style.zIndex = 1;
    blockError.style.top = '235px';
    blockRhombus.style.top = '230px';
    errorText.textContent = "Неверный код";
  };
});

buttonChangeNumber.addEventListener('click', function(){
  numberTelSecond.removeAttribute('disabled');
  numberTelSecond.focus(); 
  blockCode.setAttribute('disabled', 'disabled');
});

numberTelSecond.addEventListener('focus', function(){
  blockError.style.opacity = 0;
  blockRhombus.style.opacity = 0;            
  blockError.style.zIndex = -5;
  blockRhombus.style.zIndex = -5;

  buttonNewCode.addEventListener('click',function(){
    if(numberTelSecond.value.length > AMOUNT_NUMBER_PHONE_ENTER){
      blockError.style.opacity = 0;
      blockRhombus.style.opacity = 0;            
      blockError.style.zIndex = -5;
      blockRhombus.style.zIndex = -5;
      blockCode.removeAttribute('disabled');
      numberTelSecond.setAttribute('disabled', 'disabled');
    } else {
      blockError.style.opacity = 1;
      blockRhombus.style.opacity = 1;            
      blockError.style.zIndex = 1;
      blockRhombus.style.zIndex = 1;
      blockError.style.top = '139px';
      blockRhombus.style.top = '135px';
      errorText.textContent = "Неверный номер";
    };
  });
});