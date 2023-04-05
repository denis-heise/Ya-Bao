const mainBlockSelectPizza = document.querySelector('.basket-first-block');
const amounts = document.querySelectorAll('.basket-first-block__amount');
const drinks = document.querySelectorAll('.basket__second-block__one-block');
const sauces = document.querySelectorAll('.basket-third-block__one-sauce');
const createNewPizza = (dataPizza) => `<div class="basket-first-block__one-pizza">
                                    <img src="${dataPizza.img}" alt="${dataPizza.name}" class="basket-first-block__img-pizza">
                                    <div class="basket-first-block__description-block"> 
                                        <div class="basket-first-block__name">${dataPizza.name}</div>
                                        <div class="basket-first-block__description">${dataPizza.description}</div>
                                    </div>
                                    <div class="basket-first-block__quantity-price">
                                        <div class="basket-first-block__price">${dataPizza.price} ₽</div>
                                        <div class="basket-first-block__amount">
                                            <div class="basket-first-block__symbol">-</div>
                                            <div>1</div>
                                            <div class="basket-first-block__symbol">+</div>
                                        </div>
                                        <img src="./img/basket-page/first-block/delete-pink.png" alt="delete" class="basket-first-block__img-delete">
                                    </div>
                                </div>
                                <div class="basket-first-block__line"></div>`;
const currentColor = JSON.parse(localStorage.getItem('select_pizza'));

if (currentColor !== null) {
    currentColor.forEach(item => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = createNewPizza(item);
        mainBlockSelectPizza.appendChild(newDiv);
    });
}

const deleteButton = document.querySelectorAll('.basket-first-block__img-delete'); 
if(document.querySelector('.basket-first-block__one-pizza') === null) {
    localStorage.removeItem('select_pizza');
    window.location.href = '/';
}

deleteButton.forEach(item => {
    item.addEventListener("click", function (){
        const onePizza = this.closest('.basket-first-block__one-pizza');
        const linePizza = onePizza.nextElementSibling;
        onePizza.remove();
        linePizza.remove();

        if(document.querySelector('.basket-first-block__one-pizza') === null) {
            localStorage.removeItem('select_pizza');
            window.location.href = '/';
        }
    });
});



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
