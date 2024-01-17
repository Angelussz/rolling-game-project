const filtered = location.hash.substring(1);
const titleEdit = document.getElementById("title");
const descriptionEdit = document.getElementById("description");
const filterItems = document.getElementById("filterItems");

const PCMessage =
  "¡Los juegos de PC nunca han sido mejores! Las nuevas tecnologías nos permiten experimentar los juegos a un nivel completamente nuevo. Si desea el mejor rendimiento y espectaculares gráficos fotorrealistas, la PC es la plataforma de juegos ideal para usted. Explora una rica biblioteca de increíbles juegos disponibles para PC y encuentra la próxima aventura que te mantendrá ocupado durante horas. ¡Aquí hay una pequeña lista de los mejores juegos de PC disponibles ahora mismo!";
const XBOXMessage =
  "Si eres fanático de los juegos de Xbox o conoces a alguien a quien le encantaría jugar algunos de los mejores títulos de XBOX que el mundo de los videojuegos tiene para ofrecer, tenemos una propuesta para ti. ¿Por qué no pruebas el código de canje de Xbox? Gracias a esta sencilla secuencia de personajes podrás jugar a los mejores juegos que ofrece la consola de Microsoft. Los códigos de juegos de Xbox te ofrecen la oportunidad de ingresar al mundo del entretenimiento incomparable gracias a la sólida biblioteca de títulos disponibles en Xbox One, Xbox Series S/X. Así que no pierdas el tiempo y mira cómo puedes obtener las mejores ofertas digitales hoy con códigos de canje de Xbox One y Series X/S.";
const PS4Message =
  "Si eres fanático de las excelentes experiencias de juego, definitivamente deberías consultar los mejores títulos de juegos baratos de PS5 y PS4. Gracias a las claves de los juegos de Playstation de nuestra oferta, podrás conseguirlos a precios muy atractivos.";
const printTitleDescription = () => {
  titleEdit.textContent = filtered;
  switch (filtered) {
    case "PC":
      descriptionEdit.textContent = PCMessage;
      break;
    case "PS4":
      descriptionEdit.textContent = PS4Message;
      break;
    case "XBOX":
      descriptionEdit.textContent = XBOXMessage;
      break;
    default:
      location.assign("../")
      break;
  }
  // if (filtered === "PC") {
  //   descriptionEdit.textContent = PCMessage;
  // }
  // if (filtered === "XBOX") {
  //   descriptionEdit.textContent = XBOXMessage;
  // }
  // if (filtered === "PS4") {
  //   descriptionEdit.textContent = PS4Message;
  // }
};

const itemsByConsole = () => {
  const registerGames = JSON.parse(localStorage.getItem("games"));
  //   console.log(registerGames)

  if (registerGames !== null) {
    if (registerGames.length > 0) {
      const games = registerGames.filter((game) => {
        if (game.platforms.find((console) => console === filtered)) {
          return game;
        }
      });
      console.log(games);
      // console.log(filterItems)
      games.forEach((game) => {
        filterItems.innerHTML += `\n<div class="card" style="width: 18rem; background-color:#7302D5;color: white">
          <img src="${game.URLimage}" class="card-img-top" alt="${game.name}">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">${game.description}</p>
            <a href="#" class="btn btn-primary">Ver más</a>
          </div>
        </div>\n`;
      });
    } else {
      window.location.replace("../index.html");
    }
  } else {
    window.location.replace("../index.html");
  }
};

window.addEventListener('hashchange', function() {
  this.location.reload()
  console.log("cambio de hash")
});


itemsByConsole();
printTitleDescription();
