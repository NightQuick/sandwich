import { swicherTable } from '@constant';

export function renderSwicherTable() {
  const table = document.getElementById('menu-swicher');
  for (const type of swicherTable) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'menu-button';
    td.id = swicherTable[type].id;
    td.textContent = swicherTable[type].content;
    tr.appendChild(td);
    table.appendChild(tr);
  }
}
