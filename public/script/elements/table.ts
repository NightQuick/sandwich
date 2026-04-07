import { switcherTable } from '@constants';
import { pubSub } from '@dp/pubSub';
import { slider } from '@ui/tableAnimate';

export function renderSwitcherTable() {
  const table = document.getElementById('menu-switcher');
  for (const type in switcherTable) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'menu-button';
    td.id = switcherTable[type].id;
    td.textContent = switcherTable[type].content;
    tr.appendChild(td);
    table.appendChild(tr);
  }
  table.onclick = function (event) {
    if ((event.target as Node).nodeName != 'TD') return;
    for (const tr of table.children) {
      if (tr.classList.contains('menu-switcher-active')) {
        tr.classList.remove('menu-switcher-active');
      }
      if (tr.classList.contains('menu-switcher-inactive')) {
        tr.classList.remove('menu-switcher-inactive');
      }
    }

    (event.target as Element).parentElement.classList.add('menu-switcher-active');
    for (const tr of table.children) {
      if (!tr.classList.contains('menu-switcher-active')) {
        tr.classList.remove('menu-switcher-inactive');
      }
    }

    let category = (event.target as Element).id.split('-')[2].split('&');
    pubSub.publish('menuType', { message: 'User changed menu category', category });
  };
  slider.create();
}
