import {
  counterWrapper,
  buttonMinus,
  buttonMinusContent,
  input,
  buttonPlus,
  buttonPlusContent
} from '@constant';

export function counter() {
  buttonMinus.className = 'counter-buttons';
  buttonMinusContent.className = 'counter-buttons-text';
  buttonMinusContent.textContent = '-';
  input.name = 'counter';
  input.className = 'product-counter-input';
  input.type = 'number';
  input.inputmode = 'numeric';
  input.value = '1';
  buttonPlus.className = 'counter-buttons';
  buttonPlusContent.className = 'counter-buttons-text';
  buttonPlusContent.textContent = '+';

  buttonMinus.addEventListener('click', () => {
    if (input.value > 1) {
      input.value--;
    }
  });
  buttonPlus.addEventListener('click', () => {
    input.value++;
  });

  input.addEventListener('input', () => {
    input.value = Math.abs(input.value);
  });

  buttonMinus.appendChild(buttonMinusContent);
  buttonPlus.appendChild(buttonPlusContent);

  counterWrapper.appendChild(buttonMinus);
  counterWrapper.appendChild(input);
  counterWrapper.appendChild(buttonPlus);

  return counterWrapper;
}
