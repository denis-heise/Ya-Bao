const buttonBasket = document.querySelector('.header-content__basket');
const basketAmount = document.querySelector('.header-content__basket-amount');
const wrapperPopup = document.querySelector('.wrapper-popup');
const popup = document.querySelector('.popup');
const rhombus = document.querySelector('.popup__rhombus');
const blockDrink = popup.querySelector('.popup__block-drink');
const drinksPopup = popup.querySelectorAll('.popup__one-drink');
const template = document.querySelector('.popup__template').content;
const templateBlockNode = template.querySelector('.popup__block-pizza');
const thirdBlock = document.querySelector('.block-content-third');
const basketArrow = document.querySelector('.header-content__basket-arrow');
const arraySelectPizza = [];
let click = basketAmount.innerText;

const goBasket = function (){
    window.location.href = './basket.html';
};
function deleteBlock (element, sumNumber, price) {
    element.addEventListener('click', function(){
        const block = element.closest('.popup__block-pizza');
        block.remove();
        const deleteButtons = document.querySelectorAll('.popup__delete');

        if (deleteButtons.length === 0) {
            popup.classList.remove('active-popup');
            rhombus.classList.remove('active-popup');
            rhombus.style.zIndex = -3;
            basketArrow.style.display = "none";
            
            buttonBasket.removeEventListener('mouseenter', function(){
                if(basketAmount.innerText != 0){
                    popup.classList.add('active-popup');
                    rhombus.classList.add('active-popup');
                    rhombus.style.zIndex = 21;
                };
                if (popup.classList.contains('active-popup')) {
                    for (const drinkPopup of drinksPopup){
                        drinkPopup.element.addEventListener('click', function(){
                            element.classList.toggle('select');
                        });            
                    };
                    moveBlock(drinksPopup, blockDrink);
                    popup.addEventListener('mouseleave', function(){
                        popup.classList.remove('active-popup');
                        rhombus.classList.remove('active-popup');
                        rhombus.style.zIndex = -3;
                    });
                };
            });

            for(const drinkPopup of drinksPopup){
                drinkPopup.classList.remove('select');
            };
        };
        basketAmount.innerText = deleteButtons.length;
        sumNumber.textContent = Number(sumNumber.textContent) - Number(price.textContent);
    });
};

function changeNumber (element){
    const elementsDiv = element.querySelectorAll('div');
    let click = 1;

    elementsDiv[0].addEventListener('click', function(){
        if(click !== 0) {
            click--;
            elementsDiv[1].innerText = click;
        };
    });
    elementsDiv[2].addEventListener('click', function(){
        click++;
        elementsDiv[1].innerText = click;
    });
};

function moveBlock (element, items) {
    if(window.outerWidth >= 1024){
        element[1].addEventListener("mouseenter", function(){
            items.style.marginLeft = -220 + 'px';
        });
        element[0].addEventListener("mouseenter", function(){
            items.style.marginLeft = 38 + 'px';
        });
    } else if(window.outerWidth < 1024){
        element[1].addEventListener("touchstart", function(){
            items.style.marginLeft = -210 + 'px';
        });
        element[0].addEventListener("touchstart", function(){
            items.style.marginLeft = 38 + 'px';
        });
    };
};
function selectBlock (element) {
    element.addEventListener('click', function(){
        element.classList.toggle('select');
    });
};
function changeAmount (element){
    element.addEventListener('click', function(evt){
        const buttonTargen = evt.target;
        const block = buttonTargen.closest('.block-content-third__cell');
        const imgPizza = block.querySelector('img');
        const namePizza = block.querySelector('.block-content-third__name-pizza');
        const priceOne = block.querySelector('.block-content-third__pizza-price');
        const numberPrice = priceOne.querySelector('span');
        const descriptionPizza = block.querySelector('.block-content-third__description-pizza');

        const blockNode = templateBlockNode.cloneNode(true);
        const imgBlockTemplate = blockNode.querySelector('.popup__img-block');
        const imgTemplate = imgBlockTemplate.querySelector('img');
        const img = imgPizza.getAttribute('src');
        const namePizzaTemplate = blockNode.querySelector('.popup__name-pizza');
        const priceOneTemplateNumber = blockNode.querySelector('.popup__price-one');
        const amounts = blockNode.querySelectorAll('.popup__amount');
        const deleteButtons = blockNode.querySelectorAll('.popup__delete');
        const sumPrice = popup.querySelector('.popup__sumPrice');
        const sumPriceNumber = sumPrice.querySelector('span');        
        const deleteBut = document.querySelectorAll('.popup__delete');
        const infoSelectPizza = {
            name: namePizza.textContent,
            img: imgPizza.getAttribute('src'),
            description: descriptionPizza.textContent,
            price: numberPrice.textContent
        }

        arraySelectPizza.push(infoSelectPizza);
        localStorage.setItem("select_pizza", JSON.stringify(arraySelectPizza));

        if(deleteBut.length < 2){
            sumPriceNumber.textContent = Number(sumPriceNumber.textContent) + Number(numberPrice.textContent);
        };
        if(buttonTargen){
            basketArrow.style.display = "block";
        };
        namePizzaTemplate.innerText = namePizza.innerText;
        priceOneTemplateNumber.innerText = numberPrice.innerText + ' ₽';
        imgTemplate.setAttribute('src', img);

        for(const amount of amounts){
            changeNumber(amount);
        };
        for (const deleteButton of deleteButtons) {
            deleteBlock(deleteButton, sumPriceNumber, numberPrice);
        };

        if (basketAmount.innerText < 2){
            popup.prepend(blockNode);
            const deleteButtons = document.querySelectorAll('.popup__delete');
            basketAmount.innerText = deleteButtons.length;
        };
    });
    buttonBasket.addEventListener('mouseenter', function(){
        if(basketAmount.innerText != 0){
            popup.classList.add('active-popup');
            rhombus.classList.add('active-popup');
            rhombus.style.zIndex = 21;
        };
        if (popup.classList.contains('active-popup')) {
            moveBlock(drinksPopup, blockDrink);
            popup.addEventListener('mouseleave', function(){
                popup.classList.remove('active-popup');
                rhombus.classList.remove('active-popup');
                rhombus.style.zIndex = -3;
            });
        };
    });
    if(window.outerWidth <= 1000){
        basketArrow.addEventListener('touchstart', function(){
            popup.classList.toggle('active-popup');
            rhombus.classList.toggle('active-popup');
            basketArrow.classList.toggle('arrow-active');
            if (basketArrow.classList.contains('arrow-active')) {
                rhombus.style.zIndex = 21;
            } else {
                rhombus.style.zIndex = -3;
            };
            if (popup.classList.contains('active-popup')) {
                moveBlock(drinksPopup, blockDrink);
            };
        });
    };
};
changeAmount(thirdBlock);

for (const drinkPopup of drinksPopup){
    selectBlock(drinkPopup);
};

buttonBasket.addEventListener('mouseenter', function(){
    if(basketAmount.textContent == 0){
        buttonBasket.removeEventListener('click', goBasket)
    } else if (basketAmount.textContent !== 0) {
        buttonBasket.addEventListener('click', goBasket)
    };
});