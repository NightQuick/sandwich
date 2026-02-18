import { Menu } from "./menu.js";
//Создание эвентов для таблицы выбора категорий
let loadedMenus = {};
let table = document.getElementById("menu-swicher");
table.firstElementChild.onclick = function (event) {
  if (event.target.nodeName != "TD") return;

  for (let tr of table.firstElementChild.children) {
    tr.style.backgroundColor = "white";
  }
  event.target.parentElement.style.backgroundColor = "#FFC000";

  let category = event.target.id.split("-")[2].split("&");

  if (!loadedMenus[category]) {
    console.log("Чтение JSON");
    let menu = new Menu(category);
    loadedMenus[category] = menu;
  }
  loadedMenus[category].render();
};
//При запуске страницы открывается меню с пиццей
document.getElementById("menu-swicher-pizza-button").click();
