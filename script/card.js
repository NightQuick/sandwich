import { addProduct } from "./basket.js";
import { openModal } from "./modal.js";

//Карточки товаров(не ингридиентов модального окна)
export class Card {
  constructor(data) {
    this.data = data;
  }

  //функция отрисовки карточки, возвращает html-element
  render() {
    //карточка
    const card = document.createElement("div");
    card.className = "position-card";

    //логотип компании(если есть)
    const logo = document.createElement("img");
    logo.className = "logo";
    switch (this.data["market"]) {
      case "doner": {
        logo.src = "i/markets/doner.png";
        break;
      }
      case "sfc": {
        logo.src = "i/markets/south_fried_chicken.png";
        break;
      }
      case "subway": {
        logo.src = "i/markets/subway_logo.png";
        break;
      }
    }

    //изображение товара
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "product-image-wrapper";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = this.data["image"];

    //название товара
    const name = document.createElement("h1");
    name.className = "product-name";
    name.innerText = this.data["name"];

    //описание товара и в то же время кнопка открытия модального окна
    const ingridientWrapper = document.createElement("div");
    ingridientWrapper.className = "product-ingridients";

    const ingridient = document.createElement("a");
    ingridient.innerText = this.data["description"];

    //цена
    const price = document.createElement("h1");
    price.className = "product-price";
    price.innerText = "ЦЕНА: " + this.data["price"] + " руб.";

    //счетчик
    const counterDescription = document.createElement("h1");
    counterDescription.className = "counter-description";
    counterDescription.innerText = "КОЛИЧЕСТВО";

    const counter = document.createElement("div");
    counter.className = "product-counter";

    //кнопки счетчика
    const minusButton = document.createElement("button");
    minusButton.className = "minus-button counter-buttons";

    const minusButtonText = document.createElement("h1");
    minusButtonText.innerText = "-";
    minusButtonText.className = "counter-buttons-text";

    //поле счетчика
    const counterInput = document.createElement("input");
    counterInput.name = "counter";
    counterInput.className = "product-counter-input";
    counterInput.type = "number";
    counterInput.inputmode = "numeric";
    counterInput.value = "1";

    const plusButton = document.createElement("button");
    plusButton.className = "plus-button counter-buttons";

    const plusButtonText = document.createElement("h1");
    plusButtonText.innerText = "+";
    plusButtonText.className = "counter-buttons-text";

    //кнопка добавления товара в корзину
    const addToBasket = document.createElement("button");
    addToBasket.className = "product-add-to-basket";
    addToBasket.innerText = "В КОРЗИНУ";

    card.appendChild(logo);

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(name);

    ingridientWrapper.appendChild(ingridient);

    card.appendChild(ingridientWrapper);
    card.appendChild(price);
    card.appendChild(counterDescription);

    minusButton.appendChild(minusButtonText);
    plusButton.appendChild(plusButtonText);
    counter.appendChild(minusButton);
    counter.appendChild(counterInput);
    counter.appendChild(plusButton);

    card.appendChild(counter);
    card.appendChild(addToBasket);

    minusButton.addEventListener("click", () => {
      if (counterInput.value > 1) {
        counterInput.value -= 1;
      }
    });
    plusButton.addEventListener("click", () => {
      counterInput.value = +counterInput.value + 1;
    });

    counterInput.addEventListener("input", () => {
      counterInput.value = Math.abs(counterInput.value);
    });
    if (this.data["components"]) {
      ingridient.addEventListener("click", () => {
        openModal(this.data);
      });
    } else {
      ingridientWrapper.style.color = "black";
      ingridientWrapper.style.textDecorationLine = "none";
    }

    addToBasket.addEventListener("click", () => {
      if (counterInput.value == 0) {
        counterInput.value = 1;
      }
      addProduct(this.data["name"], counterInput.value, this.data["price"]);

      const basketButton = document.getElementById("place-an-order");
      basketButton.style.backgroundColor = "#FFC000";
      basketButton.style.cursor = "pointer";
    });
    return card;
  }
}
