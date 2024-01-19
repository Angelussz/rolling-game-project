const filtered = decodeURIComponent(location.hash.substring(1));
const titleEdit = document.getElementById("title");
const descriptionEdit = document.getElementById("description");
const filterItems = document.getElementById("filterItems");
let gamesPrint = [];
const consoleMessage = {
  PC: "¡Los juegos de PC nunca han sido mejores! Las nuevas tecnologías nos permiten experimentar los juegos a un nivel completamente nuevo. Si desea el mejor rendimiento y espectaculares gráficos fotorrealistas, la PC es la plataforma de juegos ideal para usted. Explora una rica biblioteca de increíbles juegos disponibles para PC y encuentra la próxima aventura que te mantendrá ocupado durante horas. ¡Aquí hay una pequeña lista de los mejores juegos de PC disponibles ahora mismo!",
  XBOX: "Si eres fanático de los juegos de Xbox o conoces a alguien a quien le encantaría jugar algunos de los mejores títulos de XBOX que el mundo de los videojuegos tiene para ofrecer, tenemos una propuesta para ti. ¿Por qué no pruebas el código de canje de Xbox? Gracias a esta sencilla secuencia de personajes podrás jugar a los mejores juegos que ofrece la consola de Microsoft. Los códigos de juegos de Xbox te ofrecen la oportunidad de ingresar al mundo del entretenimiento incomparable gracias a la sólida biblioteca de títulos disponibles en Xbox One, Xbox Series S/X. Así que no pierdas el tiempo y mira cómo puedes obtener las mejores ofertas digitales hoy con códigos de canje de Xbox One y Series X/S.",
  PS4: "Si eres fanático de las excelentes experiencias de juego, definitivamente deberías consultar los mejores títulos de juegos baratos de PS5 y PS4. Gracias a las claves de los juegos de Playstation de nuestra oferta, podrás conseguirlos a precios muy atractivos.",
};

const itemsBy = (tipe = "otros") => {
  const registerGames = JSON.parse(localStorage.getItem("games"));
  if (registerGames !== null) {
    if (registerGames.length > 0) {
      
      if (tipe === "consola") {
        gamesPrint = registerGames.filter((game) => {
          if (game.platforms.find((console) => console === filtered)) {
            return game;
          }
        });
      } else if ((tipe === "genero")) {
        gamesPrint = registerGames.filter((game) => {
          if (game.category.find((gender) => gender === filtered)) {
            return game;
          }
        });
      }
      else{
        gamesPrint = registerGames.filter((game) => {
          if (game.name.includes(filtered)) {
            return game;
          }
        });
      }
    } else {
      window.location.replace("../index.html");
    }
  } else {
    window.location.replace("../index.html");
  }
};
const printList = () => {
  gamesPrint.forEach((game) => {
    filterItems.innerHTML += `\n<div class="card my-2" style="width: 18rem; background-color:#7302D5;color: white">
        <img src="${game.URLimage}" class="card-img-top" style="height:200px; text-overflow:elipsis" alt="${game.name}">
        <div class="card-body">
          <h5 class="card-title">${game.name}</h5>
          <p class="card-text mt-4">$ ${game.price}</p>
          
        </div>
      </div>\n`;
  });
};
const printTitleDescription = () => {
  if (filtered === "PC" || filtered === "PS4" || filtered === "XBOX") {
    titleEdit.textContent = `Juegos de ${filtered}`;
    descriptionEdit.textContent = consoleMessage[filtered];
    itemsBy("consola");
  } else if (
    filtered === "accion" ||
    filtered === "aventura" ||
    filtered === "deportes"
  ) {
    titleEdit.textContent = `Mejores juegos de ${filtered.toUpperCase()}`;
    itemsBy("genero");
  } else {
    titleEdit.textContent = `${filtered.toUpperCase()}`;
    descriptionEdit.textContent = "";
    itemsBy();
  }
  printList();
};

window.addEventListener("hashchange", function () {
  this.location.reload();
  console.log("cambio de hash");
});

printTitleDescription();
