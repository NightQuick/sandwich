export function setWidth() {
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      basketButton();
    } else removeBasketButton();
  });
  const event = new Event('resize');
  window.dispatchEvent(event);
}
function basketButton() {
  const basketButton = document.createElement('button');
  basketButton.id = 'basket-button';
  const img = document.createElement('div');
  img.id = 'basket-button-img';
  basketButton.appendChild(img);

  let basketOpened = false;
  basketButton.addEventListener('click', () => {
    const basket = document.getElementById('basket');
    if (basketOpened) {
      basket?.classList.remove('basket-active');
      basketOpened = false;
    } else {
      basket?.classList.add('basket-active');
      basketOpened = true;
    }
  });
  document.getElementById('active-panel')?.appendChild(basketButton);
}
function removeBasketButton() {
  if (document.getElementById('basket-button')) {
    document.getElementById('basket-button')!.remove();
  }
}
