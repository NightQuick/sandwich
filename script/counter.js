export function counter() {
  const counterWrapper = document.createElement("div");
  const buttonMinus = document.createElement("button");
  buttonMinus.className = "minus-button counter-buttons";
  const buttonMinusContent = document.createElement("h1");
  buttonMinusContent.className = "counter-buttons-text";
  buttonMinusContent.textContent = "-";
  const input = document.createElement("input");
  input.name = "counter";
  input.className = "product-counter-input";
  input.type = "number";
  input.inputmode = "numeric";
  input.value = "1";
  const buttonPlus = document.createElement("button");
  buttonPlus.className = "minus-button counter-buttons";
  const buttonPlusContent = document.createElement("h1");
  buttonPlusContent.className = "counter-buttons-text";
  buttonPlusContent.textContent = "+";

  buttonMinus.addEventListener("click", () => {
    if (input.value > 1) {
      input.value--;
    }
  });
  buttonPlus.addEventListener("click", () => {
    input.value++;
  });

  input.addEventListener("input", () => {
    counterInput.value = Math.abs(counterInput.value);
  });

  buttonMinus.appendChild(buttonMinusContent);
  buttonPlus.appendChild(buttonPlusContent);

  counterWrapper.appendChild(buttonMinus);
  counterWrapper.appendChild(input);
  counterWrapper.appendChild(buttonPlus);

  return counterWrapper;
}
