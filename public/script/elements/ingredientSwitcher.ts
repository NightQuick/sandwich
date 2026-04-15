import { ingredientSwitcher } from '@constants';

export function renderIngredientSwitcher() {
  const table = document.getElementById('ingredients-switcher');
  const tr = document.createElement('tr');
  for (let element in ingredientSwitcher) {
    const td = document.createElement('td');
    td.id = ingredientSwitcher[element as keyof typeof ingredientSwitcher].id;
    td.textContent = ingredientSwitcher[element as keyof typeof ingredientSwitcher].content;
    td.className = 'ingredients';
    tr.appendChild(td);
  }
  table!.appendChild(tr);
}
