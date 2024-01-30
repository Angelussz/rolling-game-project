import { getRoleUserLog, saveUserLog } from "./hellpers.js";
import { checkAdmin } from "./user.js";

const getRoleUser = () => {
  if (getRoleUserLog() !== "invitado" && getRoleUserLog() !== "admin") {
    const isUser = JSON.parse(sessionStorage.getItem("user"));
    isUser.favorites = new Set(isUser.favorites);
    return isUser;
  } else {
    false;
  }
};
let actualuser = getRoleUser();
let adminLi = document.getElementById("adminLi");
checkAdmin(adminLi);
let cardProductos = document.getElementById("cardProductos");
// console.log(JSON.parse(localStorage.getItem("games")) || [])
window.favoriteGame = (codeGame) => {
  const id = document.getElementById(`id-${codeGame}`);
  if (actualuser) {
    if (id.className === "bg-danger rounded") {
      id.className = "bg-light rounded";
      actualuser.favorites.delete(codeGame);
    } else {
      actualuser.favorites.add(codeGame);
      id.className = "bg-danger rounded";
    }
    actualuser.favorites = [...actualuser.favorites];
    saveUserLog(actualuser);
    actualuser.favorites = new Set(actualuser.favorites);
    // console.log(actualuser.favorites)
  }
};
function CrearCards() {
  const arrayProductos = JSON.parse(localStorage.getItem("games")) || [];
  cardProductos.innerHTML = "";
  arrayProductos.forEach((game) => {
    cardProductos.innerHTML += ` <div class="card m-3 card-main" style="width: 300px;">
          <img src="${game.URLimage}" class="card-img-top w-100" alt="${game.description}">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">${game.description}</p>   
            <p class="card-text">$ ${game.price}</p>
            <button onClick="favoriteGame(${game.code})" id="id-${game.code}" class="rounded"><i class="bi bi-heart text-black"></i></button>  
          </div>
        </div>`;
  });
  if (actualuser) {
    actualuser.favorites.forEach((idFavorites) => {
      const actualCard = document.getElementById(`id-${idFavorites}`);
      actualCard.className = "bg-danger rounded";
    });
  }
}
CrearCards();
