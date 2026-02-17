import { Menu } from "./menu.js";
//Создание эвентов для таблицы выбора категорий

let table = document.getElementById("menu-swicher");
table.firstElementChild.onclick = function (event) {
  if (event.target.nodeName != "TD") return;

  for (let tr of table.firstElementChild.children) {
    tr.style.backgroundColor = "white";
  }
  event.target.parentElement.style.backgroundColor = "#FFC000";

  let category = event.target.id.split("-")[2].split("&");

  let menu = new Menu(category);
  menu.render();
};
//При запуске страницы открывается меню с пиццей
document.getElementById("menu-swicher-pizza-button").click();
