let table = document.getElementById("menu-swicher");
table.firstElementChild.onclick = function (event) {
  if (event.target.nodeName != "TD") return;
  // alert(event.target.id.split("-")[2].split("&"));
  for (tr of table.firstElementChild.children) {
    tr.style.backgroundColor = "white";
  }
  event.target.parentElement.style.backgroundColor = "#FFC000";
};
