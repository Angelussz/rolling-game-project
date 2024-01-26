import { getRoleUserLog, saveUserLog } from "./hellpers.js";
import { checkAdmin } from "./user.js";
if (getRoleUserLog() === "invitado") {
  window.location.replace("/index.html");
  // console.log("sd")
} else if (getRoleUserLog().role === "admin") {
  window.location.replace("/index.html");
}
let adminLi = document.getElementById("adminLi");
checkAdmin(adminLi);
let favorites = document.getElementById("favoriteItems");

const allFavorites = () => {
  const resultGamesFavorites = [];
  const userItems = JSON.parse(sessionStorage.getItem("user"));
  const games = JSON.parse(localStorage.getItem("games"));

  games.forEach((game) => {
    if (userItems.favorites.includes(game.code)) {
      resultGamesFavorites.push(game);
    }
  });
  return resultGamesFavorites;
};
let favoriteItems = allFavorites();
window.deleteGame = (codeGame) => {
  const userItems = JSON.parse(sessionStorage.getItem("user"));
  userItems.favorites = userItems.favorites.filter((item) => item !== codeGame);
  favoriteItems = favoriteItems.filter((item) => item.code !== codeGame);
  saveUserLog(userItems);
  favorites.innerHTML = "";
  printList(favoriteItems);
};
const printList = (gamesPrint) => {
  gamesPrint.forEach((game) => {
    favorites.innerHTML += `\n<div class="card m-3 card-main" style="width: 300px;">
      <img src="${game.URLimage}" class="card-img-top w-100" alt="${game.description}">
      <div class="card-body">
        <h5 class="card-title">${game.name}</h5>
        <p class="card-text">${game.description}</p>   
        <p class="card-text">$ ${game.price}</p>
        <button onClick="deleteGame(${game.code})" id="id-${game.code}">Eliminar de lista favoritos</button>  
      </div>
    </div>\n`;
  });
};

printList(favoriteItems);
