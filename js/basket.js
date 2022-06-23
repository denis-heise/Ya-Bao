const amounts = document.querySelectorAll('.basket-first-block__amount');
const drinks = document.querySelectorAll('.basket__second-block__one-block');
const sauces = document.querySelectorAll('.basket-third-block__one-sauce');

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
function selectBlock (element) {
    element.addEventListener('click', function(){
        element.classList.toggle('select');
    });
};

function useCycle (elements, nameFunc){
    for(const element of elements){
        nameFunc(element);
    };
};
useCycle(amounts, changeNumber);
useCycle(drinks, selectBlock);
useCycle(sauces, selectBlock);