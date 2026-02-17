export function addProduct(name, value, price) {
  //Создние строки с продкутом, добавляемым в корзину
  const basket = document.getElementById("basket-content");
  const template = document.getElementById("basket-content-template");
  const newContent = template.content.cloneNode(true);
  const td = newContent.querySelectorAll("td");
  td[0].innerText = name;
  td[1].innerText = value;
  basket.appendChild(newContent);
  const basketPrice = document.getElementById("order-status");
  let currentPrice = parseInt(basketPrice.dataset.price) || 0;

  //Изменение цены
  currentPrice += value * price;
  basketPrice.dataset.price = currentPrice;
  basketPrice.textContent = `Итого: ${currentPrice} руб.`;

  const orderButton = document.getElementById("place-an-order");
  orderButton.style.backgroundColor = "#FFC000";
}
