export function counter() {
  const counterWrapper = document.createElement("div");
  const buttonMinus = document.createElement("button");
  buttonMinus.className = "counter-buttons";
  const buttonMinusContent = document.createElement("span");
  buttonMinusContent.className = "counter-buttons-text";
  buttonMinusContent.textContent = "-";
  const input = document.createElement("input");
  input.name = "counter";
  input.className = "product-counter-input";
  input.type = "number";
  input.inputmode = "numeric";
  input.value = "1";
  const buttonPlus = document.createElement("button");
  buttonPlus.className = "counter-buttons";
  const buttonPlusContent = document.createElement("span");
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
    input.value = Math.abs(input.value);
  });

  buttonMinus.appendChild(buttonMinusContent);
  buttonPlus.appendChild(buttonPlusContent);

  counterWrapper.appendChild(buttonMinus);
  counterWrapper.appendChild(input);
  counterWrapper.appendChild(buttonPlus);

  return counterWrapper;
}
