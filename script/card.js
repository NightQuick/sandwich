import { addProduct } from "./basket.js";
import { counter } from "./counter.js";
import { SandwichBuilder } from "./modal.js";

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
    const name = document.createElement("span");
    name.className = "product-name";
    name.textContent = this.data["name"];

    //описание товара и в то же время кнопка открытия модального окна
    const ingridientWrapper = document.createElement("div");
    ingridientWrapper.className = "product-ingridients";

    const ingridient = document.createElement("a");
    ingridient.textContent = this.data["description"];

    //цена
    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = "ЦЕНА: " + this.data["price"] + " руб.";

    //счетчик
    const counterDescription = document.createElement("span");
    counterDescription.className = "counter-description";
    counterDescription.textContent = "КОЛИЧЕСТВО";

    const counterElem = counter();

    //кнопка добавления товара в корзину
    const addToBasket = document.createElement("button");
    addToBasket.className = "product-add-to-basket";
    addToBasket.textContent = "В КОРЗИНУ";

    card.appendChild(logo);

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(name);

    ingridientWrapper.appendChild(ingridient);

    card.appendChild(ingridientWrapper);
    card.appendChild(price);
    card.appendChild(counterDescription);

    card.appendChild(counterElem);
    card.appendChild(addToBasket);

    if (this.data["components"]) {
      ingridient.addEventListener("click", () => {
        const cleanData = JSON.parse(JSON.stringify(this.data));
        const builder = new SandwichBuilder(cleanData);
        builder.openBuilder();
      });
    } else {
      ingridientWrapper.style.color = "black";
      ingridientWrapper.style.textDecorationLine = "none";
    }

    addToBasket.addEventListener("click", () => {
      const counterInput = counterElem.querySelector(".product-counter-input");
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
