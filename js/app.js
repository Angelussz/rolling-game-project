import { getRoleUserLog, saveUserLog } from "./hellpers.js";
import { checkAdmin } from "./user.js";
const filtered = decodeURIComponent(location.hash.substring(1));
const titleEdit = document.getElementById("title");
const descriptionEdit = document.getElementById("description");
const consoleMessage = {
  PC: "¡Los juegos de PC nunca han sido mejores! Las nuevas tecnologías nos permiten experimentar los juegos a un nivel completamente nuevo. Si desea el mejor rendimiento y espectaculares gráficos fotorrealistas, la PC es la plataforma de juegos ideal para usted. Explora una rica biblioteca de increíbles juegos disponibles para PC y encuentra la próxima aventura que te mantendrá ocupado durante horas. ¡Aquí hay una pequeña lista de los mejores juegos de PC disponibles ahora mismo!",
  XBOX: "Si eres fanático de los juegos de Xbox o conoces a alguien a quien le encantaría jugar algunos de los mejores títulos de XBOX que el mundo de los videojuegos tiene para ofrecer, tenemos una propuesta para ti. ¿Por qué no pruebas el código de canje de Xbox? Gracias a esta sencilla secuencia de personajes podrás jugar a los mejores juegos que ofrece la consola de Microsoft. Los códigos de juegos de Xbox te ofrecen la oportunidad de ingresar al mundo del entretenimiento incomparable gracias a la sólida biblioteca de títulos disponibles en Xbox One, Xbox Series S/X. Así que no pierdas el tiempo y mira cómo puedes obtener las mejores ofertas digitales hoy con códigos de canje de Xbox One y Series X/S.",
  PS4: "Si eres fanático de las excelentes experiencias de juego, definitivamente deberías consultar los mejores títulos de juegos baratos de PS5 y PS4. Gracias a las claves de los juegos de Playstation de nuestra oferta, podrás conseguirlos a precios muy atractivos.",
};
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
function CrearCards(arrayProductos) {
  // const arrayProductos = JSON.parse(localStorage.getItem("games")) || [];
  cardProductos.innerHTML = "";
  arrayProductos.forEach((game) => {
    cardProductos.innerHTML += ` <div class="card m-3 card-main" style="width: 300px;">
          <img src="${game.URLimage}" class="card-img-top w-100" alt="${game.description}">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">${game.description}</p>   
            <p class="card-text">$ ${game.price}</p>
            <button onClick="favoriteGame(${game.code})" id="id-${game.code}" class="rounded"><i class="bi bi-heart text-black"></i></button>
            <a href="./pages/details.html#${game.code}" class="btn btn-primary">Ver más</a>  
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

const itemsBy = (tipe = "otros") => {
  let gamesPrint = [];
  const registerGames = JSON.parse(localStorage.getItem("games"));
  if (registerGames !== null) {
    if (registerGames.length > 0) {
      if (tipe === "consola") {
        gamesPrint = registerGames.filter((game) => {
          if (game.platforms.find((console) => console === filtered)) {
            return game;
          }
        });
      } else if (tipe === "genero") {
        gamesPrint = registerGames.filter((game) => {
          if (game.category.find((gender) => gender === filtered)) {
            return game;
          }
        });
      } 
      else if(typeof tipe === "number"){
        gamesPrint = registerGames.filter((game) => {
          if (game.price <= tipe) {
            return game;
          }
        });
        
      }
      else {
        gamesPrint = registerGames.filter((game) => {
          if (game.name.toLowerCase().includes(filtered.toLowerCase())) {
            return game;
          }
        });
      }
    } 
  }
  return gamesPrint;
};
const printAll= () => {
  let arrayActualGames = [];
  let actualTitle = "Catalogo Videojuegos";
  let actuaDescription = "";
  let precio = 0;
  if (filtered === "PC" || filtered === "PS4" || filtered === "XBOX") {
    actualTitle = `Juegos de ${filtered}`;
    actuaDescription = consoleMessage[filtered];
    arrayActualGames = itemsBy("consola");
  } else if (
    filtered === "accion" ||
    filtered === "aventura" ||
    filtered === "deportes"
  ) {
    actualTitle = `Mejores juegos de ${filtered.toUpperCase()}`;
    arrayActualGames = itemsBy("genero");
  } 
  else if(!isNaN(parseInt(filtered))){
    actualTitle = `Juegos a menos de ${filtered.toUpperCase()}`;
    actuaDescription = `Tus juegos favoritos a menos de $${filtered}`;
    precio = parseInt(filtered);
    arrayActualGames = itemsBy(precio);
  }
  else {
    arrayActualGames = itemsBy();
  }
  titleEdit.textContent = actualTitle;
  descriptionEdit.textContent = actuaDescription;
  CrearCards(arrayActualGames)
  
};


window.addEventListener("hashchange", function () {
  this.location.reload();
  console.log("cambio de hash");
});
printAll()

