import { counter } from "./counter.js";
import { addProduct } from "./basket.js";

const settings = {
  size: {
    name: "Размер",
    object: "sizes",
    title: "Выберите размер сендвича",
  },
  bread: {
    name: "Хлеб",
    object: "breads",
    title: "Хлеб для сендвича на выбор",
  },
  vegetable: {
    name: "Овощи",
    object: "vegetables",
    title: "Дополнительные овощи бесплатно",
    multiple: true,
  },
  sauce: {
    name: "Соус",
    object: "sauces",
    title: "Выберите 3 бесплатных соуса по вкусу",
    multiple: true,
  },
  filling: {
    name: "Начинка",
    object: "fillings",
    title: "Добавьте начинку по вкусу",
    multiple: true,
  },
  finish: {
    name: "Готово!",
    object: "ready",
    title: "Проверьте и добавьте в корзину",
  },
};
let cardData;
let CardCollection = [];
let currentKey;
let swicherHandler = (event) => {
  ingridientSwicher(event);
};

//Функция открытия окна
export function openModal(data) {
  cardData = data;

  //Изменение вида хранения компонентов, для хранения их названий
  for (let component in cardData.components) {
    if (typeof cardData.components[component] == "string") {
      cardData.components[component] = [cardData.components[component], ""];
    } else {
      for (let arrayComponent of cardData.components[component])
        arrayComponent = [arrayComponent, ""];
    }
  }
  currentKey = "size";

  //отображение окна
  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  if (!document.getElementById("previous-modal").onclick) {
    document.getElementById("previous-modal").onclick = () => {
      renderModal(settings[getPrevKey()], data);
    };
  }
  if (!document.getElementById("next-modal").onclick) {
    document.getElementById("next-modal").onclick = () => {
      renderModal(settings[getNextKey()], data);
    };
  }
  // document
  //   .getElementById("ingridients-swicher")
  //   .addEventListener("click", swicherHandler);

  document.getElementById("close-modal").addEventListener("click", () => {
    closeModal();
  });
  renderModal(settings[currentKey], data);
}

async function renderModal(type, data = cardData) {
  if (type.object != "ready") {
    document.getElementById("modal-menu-wrapper").innerHTML = "";
    const menu = document.createElement("div");
    menu.id = "modal-menu";
    document.getElementById("modal-menu-wrapper").appendChild(menu);

    await initialize();
    console.log(type);
    console.log(data);
    console.log(data.price);
    const header = document.getElementById("header-text");
    header.textContent = type.title;
    const footer = document.getElementById("modal-footer");
    footer.textContent = "Итого: " + data.price + " руб.";
    const row = document.getElementsByClassName("ingridients");
    for (let element of row) {
      element.style.backgroundColor = "white";
    }
    document.getElementById(currentKey).style.backgroundColor = "#FFC000";

    for (let card of CardCollection) {
      card.renderModalCard();
    }
  } else {
    renderModalready();
  }
}
function renderModalready() {
  document.getElementById("modal-menu-wrapper").innerHTML = "";
  const header = document.getElementById("header-text");
  header.textContent = settings.finish.title;

  const modalReady = document.createElement("div");
  modalReady.id = "modal-ready";
  const imageWrapper = document.createElement("div");
  imageWrapper.className = "modal-card-img modal-ready";
  const img = document.createElement("img");
  img.src = cardData.image;
  const modalProductContent = document.createElement("div");
  modalProductContent.id = "modal-ready-information";
  const title = document.createElement("span");
  title.textContent = "Ваш сендвич готов!";
  const listIngridients = document.createElement("ul");
  listIngridients.id = "modal-ready-information-ingridients";
  for (let ingridient in cardData.components) {
    const ingridientElement = document.createElement("li");
    if (typeof cardData.components[ingridient][1] == "string") {
      ingridientElement.textContent = `${settings[ingridient].name}: ${cardData.components[ingridient][1]}`;
    } else {
      let list = [];
      for (let component of cardData.components[ingridient]) {
        list.push(component[1]);
      }
      if (list.length == 0) list = "Нет";
      ingridientElement.textContent = `${settings[ingridient].name}: ${list}`;
    }

    listIngridients.appendChild(ingridientElement);
  }
  const name = document.createElement("span");
  name.id = "modal-ready-name";
  name.textContent = cardData.name;

  const footer = document.getElementById("modal-footer");
  footer.innerHTML = "";
  const counterDescription = document.createElement("span");
  counterDescription.id = "modal-counter-description";
  counterDescription.textContent = "КОЛИЧЕСТВО";
  const counterElem = counter();

  const priceWrapper = document.createElement("div");
  priceWrapper.textContent = "Итого: " + cardData.price + " руб.";
  const toBasket = document.createElement("button");
  toBasket.id = "modal-add-to-basket";
  toBasket.className = "product-add-to-basket";
  toBasket.textContent = "В КОРЗИНУ";
  const row = document.getElementsByClassName("ingridients");
  for (let element of row) {
    element.style.backgroundColor = "white";
  }
  document.getElementById("finish").style.backgroundColor = "#FFC000";

  toBasket.addEventListener("click", () => {
    const input = counterElem.querySelector(".product-counter-input");
    addProduct(cardData.name, input.value, cardData.price);
    closeModal();
  });

  imageWrapper.appendChild(img);
  modalReady.appendChild(imageWrapper);

  modalProductContent.appendChild(title);
  modalProductContent.appendChild(listIngridients);
  modalProductContent.appendChild(name);
  modalReady.appendChild(modalProductContent);

  footer.appendChild(counterDescription);
  footer.appendChild(counterElem);

  priceWrapper.appendChild(toBasket);
  footer.appendChild(priceWrapper);

  document.getElementById("modal-menu-wrapper").appendChild(modalReady);
}

function getNextKey() {
  const keys = Object.keys(settings);
  const currentIndex = keys.indexOf(currentKey);

  if (currentIndex === -1) return null;
  if (currentIndex === keys.length - 1) return null;
  currentKey = keys[currentIndex + 1];
  return keys[currentIndex + 1];
}
function getPrevKey() {
  const keys = Object.keys(settings);
  const currentIndex = keys.indexOf(currentKey);

  if (currentIndex === -1) return null;
  if (currentIndex === 0) return null;
  currentKey = keys[currentIndex - 1];
  return keys[currentIndex - 1];
}

function ingridientSwicher(event, data = cardData) {
  if (event.target.nodeName != "TD") return;
  currentKey = event.target.id;
  renderModal(settings[event.target.id], data);
  const row = document.getElementsByClassName(event.target.className);
  for (let element of row) {
    element.style.backgroundColor = "white";
  }
  event.target.style.backgroundColor = "#FFC000";
}

function closeModal() {
  const row = document.getElementsByClassName("ingridients");
  for (let element of row) {
    element.style.backgroundColor = "white";
  }
  const table = document.getElementById("ingridients-swicher");
  if (table) {
    table.removeEventListener("click", swicherHandler);
  }
  const closeButton = document.getElementById("close-modal");
  if (closeButton) {
    closeButton.removeEventListener("click", closeModal);
  }
  modal.style.display = "none";
}

async function initialize() {
  await loadData();
}
async function loadData() {
  const response = await fetch("data.json");
  const jsonData = await response.json();
  CardCollection = [];

  let data = [];
  data.push(jsonData[settings[currentKey].object]);
  for (let comp in data[0]) {
    data[0][comp].id = comp;
    if (typeof cardData["components"][currentKey][0] != "string") {
      for (let component of cardData["components"][currentKey]) {
        if (comp == component[0]) {
          data[0][comp].choosed = true;
          component = [data[0][comp].id, data[0][comp].name];
        }
      }
    } else {
      if (cardData.components[currentKey][0] == comp) {
        data[0][comp].choosed = true;
        cardData.components[currentKey] = [
          data[0][comp].id,
          data[0][comp].name,
        ];
      }
    }
  }
  for (let element of data) {
    for (let product in element) {
      let cardElement = new IngridientCard(element[product]);
      CardCollection.push(cardElement);
    }
  }

  console.log(data);
  return data;
}
class IngridientCard {
  constructor(data) {
    this.data = data;
  }
  renderModalCard() {
    const card = document.createElement("div");
    card.className = "modal-card";

    const cardImg = document.createElement("div");
    cardImg.className = "modal-card-img";

    const img = document.createElement("img");
    img.src = this.data["image"];

    const cardDescription = document.createElement("h1");
    cardDescription.className = "modal-card-description";
    cardDescription.textContent = this.data["name"];

    const cardPrice = document.createElement("h1");
    cardPrice.className = "modal-card-price";
    cardPrice.textContent = "Цена: " + this.data["price"] + "руб.";

    cardImg.appendChild(img);
    card.appendChild(cardImg);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    const modalMenu = document.getElementById("modal-menu");
    modalMenu.appendChild(card);
    if (this.data.choosed) {
      card.style.backgroundColor = "#FDD55C";
      card.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.5)";
      console.log(this.data);
    }
    if (!this.data.choosed) {
      card.addEventListener("click", () => {
        if (
          settings[currentKey].multiple == false ||
          !settings[currentKey].multiple
        ) {
          for (let cardElement of modalMenu.children) {
            cardElement.style.backgroundColor = "#EBEAE8";
            cardElement.style.boxShadow = "none";
          }
        }
        card.style.backgroundColor = "#FDD55C";
        card.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.5)";

        if (typeof cardData.components[currentKey][0] == "string") {
          cardData.components[currentKey] = [this.data.id, this.data.name];
        } else {
          cardData.components[currentKey].push([this.data.id, this.data.name]);
        }
        cardData.price += this.data.price;
        renderModal(currentKey);
      });
    } else {
      card.addEventListener("click", () => {
        if (currentKey == "size" || currentKey == "bread") return;
        card.style.backgroundColor = "#EBEAE8";
        card.style.boxShadow = "none";
        cardData.price -= this.data.price;
        this.data.choosed = false;
        cardData.components[currentKey] = cardData.components[
          currentKey
        ].filter((item) => item[0] != this.data.id);
        renderModal(currentKey);
      });
    }
  }
}
