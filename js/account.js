const MINIMUM_NUMBER_ERROR_ACCOUNT = 4;
const MINIMUM_NUMBER_DISABLED_ACCOUNT = 3;
const AMOUNT_NUMBER_PHONE_ACCOUNT = 15;
const KEY_ENTER_ACCOUNT = 13;
const accountDetailsReport = document.querySelector('.block-message__details-report');
const accountRhombus = document.querySelector('.block-message__rhombus');
const accountPopup = document.querySelector('.block-message__popup');
const accountStockPage = document.querySelector('.block-bonus__stock');
const accountExitButton = document.querySelector('.button-exit');
const accountBlockPersonalData = document.querySelector('.block-personal-data');
const accountButtonChangeName = accountBlockPersonalData.querySelector('.block-personal-data__button-change');
const accountInputName = accountBlockPersonalData.querySelector('.block-personal-data__input-name');
const accountSecondInputPhone = accountBlockPersonalData.querySelector('.block-personal-data__second-input-phone');
const accountFirstInputPhone = accountBlockPersonalData.querySelector('.block-personal-data__first-input-phone');
const accountButtonSave = accountBlockPersonalData.querySelector('.block-personal-data__button-save-phone');
const accountButtonChangeCode = accountBlockPersonalData.querySelector('.block-personal-data__verification-code-change');
const accountInputCode = accountBlockPersonalData.querySelector('.block-personal-data__verification-code-input');
const accountBlockError = document.querySelector('.error-body');
const accountBlockRhombus = document.querySelector('.error__rhombus');
const accountErrorText = accountBlockError.querySelector('.error-block__text');

accountDetailsReport.addEventListener('click', function(){
    accountRhombus.classList.toggle('active');    
    accountPopup.classList.toggle('active');
    accountPopup.addEventListener('mouseleave', function(){
        accountRhombus.classList.remove('active');    
        accountPopup.classList.remove('active');
    });
});

accountStockPage.addEventListener('click', function(){
    window.location.href = './stock.html';
});
accountExitButton.addEventListener('click', function(){
    window.location.href = './index.html';
});

function removeError (input){
    input.addEventListener('keydown', function(){
        accountBlockError.style.opacity = '0';
        accountBlockRhombus.style.opacity = '0';            
        accountBlockError.style.zIndex = '-5';
        accountBlockRhombus.style.zIndex = '-5';
    });
};

function changeInput (button, input){
    button.addEventListener('click', function(){
        input.removeAttribute('disabled');
        input.style.background = '#fff';
        input.focus();
        input.selectionStart = input.value.length;
    });
    input.addEventListener('focusout', function(){
        if(input.value.length > MINIMUM_NUMBER_DISABLED){
            input.setAttribute('disabled', 'disabled');
            input.style.background = '#F3F3F7';
        } else if (input.value.length < MINIMUM_NUMBER_ERROR){
            accountBlockError.style.opacity = '1';
            accountBlockRhombus.style.opacity = '1';            
            accountBlockError.style.zIndex = '1';
            accountBlockRhombus.style.zIndex = '1';
            if(input.closest('.block-personal-data__block-name')){
                accountErrorText.textContent = 'Неверное имя';
                accountBlockError.style.top = '144px';
                accountBlockRhombus.style.top = '139px';

            } else if (input.closest('.block-personal-data__verification-code-block')){
                accountErrorText.textContent = 'Неверный код';
                accountBlockError.style.top = '528px';
                accountBlockRhombus.style.top = '523px';
            };
        };
    });
    input.addEventListener('keydown', function(evt){ 
        input.removeAttribute('disabled');
        input.style.background = '#fff';
        input.focus();
        input.selectionStart = input.value.length;
        if(input.value.length > MINIMUM_NUMBER_DISABLED && evt.keyCode == KEY_ENTER){
            input.setAttribute('disabled', 'disabled');
            input.style.background = '#F3F3F7';   
        } else if (input.value.length < MINIMUM_NUMBER_ERROR && evt.keyCode == KEY_ENTER){
            accountBlockError.style.opacity = '1';
            accountBlockRhombus.style.opacity = '1';            
            accountBlockError.style.zIndex = '1';
            accountBlockRhombus.style.zIndex = '1';
            if(input.closest('.block-personal-data__block-name')){
                accountErrorText.textContent = 'Неверное имя';
                accountBlockError.style.top = '144px';
                accountBlockRhombus.style.top = '139px';
            } else if (input.closest('.block-personal-data__verification-code-block')){
                accountErrorText.textContent = 'Неверный код';
                accountBlockError.style.top = '528px';
                accountBlockRhombus.style.top = '523px';
            };        
        };
    });
};

removeError(accountInputName);
removeError(accountSecondInputPhone);
removeError(accountInputCode);

accountButtonSave.addEventListener('click', function(){
    if(accountSecondInputPhone.value.length > AMOUNT_NUMBER_PHONE_ACCOUNT){
        accountFirstInputPhone.value = accountSecondInputPhone.value;
    } else {
        accountBlockError.style.opacity = '1';
        accountBlockRhombus.style.opacity = '1';            
        accountBlockError.style.zIndex = '1';
        accountBlockRhombus.style.zIndex = '1';
        accountErrorText.textContent = 'Неверный номер';
        accountBlockError.style.top = '430px';
        accountBlockRhombus.style.top = '425px';
    };
});
accountSecondInputPhone.addEventListener('keydown', function(evt){
    if(accountSecondInputPhone.value.length > AMOUNT_NUMBER_PHONE_ACCOUNT && evt.keyCode == KEY_ENTER_ACCOUNT){
        accountFirstInputPhone.value = accountSecondInputPhone.value;
        accountSecondInputPhone.blur()
    } else if (accountSecondInputPhone.value.length <= AMOUNT_NUMBER_PHONE_ACCOUNT && evt.keyCode == KEY_ENTER_ACCOUNT) {
        accountBlockError.style.opacity = '1';
        accountBlockRhombus.style.opacity = '1';            
        accountBlockError.style.zIndex = '1';
        accountBlockRhombus.style.zIndex = '1';
        accountErrorText.textContent = 'Неверный номер';
        accountBlockError.style.top = '430px';
        accountBlockRhombus.style.top = '425px';
    };
});

changeInput(accountButtonChangeName, accountInputName);
changeInput(accountButtonChangeCode, accountInputCode);