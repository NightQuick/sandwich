export function renderOrder(orderData) {
  console.log(orderData);
  const orderList = document.getElementById('order-list');

  const orderBox = document.createElement('div');
  orderBox.classList.add('order-message');

  const orderText = document.createElement('span');
  let text = '';
  let totalPrice = 0;
  orderData.forEach((element) => {
    text += `${element.name}, `;
    totalPrice += element.price * element.value;
  });
  orderText.textContent = `Вы заказали: ${text} Цена:${totalPrice}`;

  const closeButton = document.createElement('div');
  closeButton.className = 'close-message';
  closeButton.textContent = 'x';

  orderBox.appendChild(orderText);
  orderBox.appendChild(closeButton);
  orderList.appendChild(orderBox);

  setTimeout(() => {
    orderBox.classList.add('order-message-active');
  }, 0);

  const removeTimer = setTimeout(() => {
    orderBox.classList.remove('order-message-active');
    setTimeout(() => {
      orderList.removeChild(orderBox);
    }, 550);
  }, 5000);
  closeButton.addEventListener('click', () => {
    clearTimeout(removeTimer);
    orderBox.classList.remove('order-message-active');
    setTimeout(() => {
      orderList.removeChild(orderBox);
    }, 550);
  });
}
