import { checkAdmin } from "./user.js";
let adminLi = document.getElementById("adminLi");

checkAdmin(adminLi);
const games = JSON.parse(localStorage.getItem("games"));
const loc = parseInt(location.hash.substring(1));
const gamesF = games.find((game) => {
  return game.code === loc;
});
const title = document.getElementById("gtitle");
const description = document.getElementById("description");
const bPrice = document.getElementById("bPrice");
const bCompatibility = document.getElementById("bCompatibility");
const sO = document.getElementById("sO");
const cpu = document.getElementById("cpu");
const graphics = document.getElementById("graphics");
const ram = document.getElementById("ram");
const disc = document.getElementById("disc");
const platforms = {
  XBOX: '<i class="fa-brands fa-xbox"></i> ',
  PC: '<i class="fa-solid fa-desktop"></i> ',
  PS4: '<i class="fa-brands fa-playstation"> ',
};
let platformsIcons = "Compatibilidad: ";
gamesF.platforms.forEach((platform) => {
  platformsIcons += platforms[platform];
});

const backgroundImages = document.getElementById("game-principal");

title.textContent = gamesF.name;
description.textContent = gamesF.description;
bPrice.textContent = ` ${gamesF.price}`;
bCompatibility.innerHTML = platformsIcons;
sO.textContent = gamesF.requirements.SO;
cpu.textContent = gamesF.requirements.processor;
graphics.textContent = gamesF.requirements.grafic;
ram.textContent = gamesF.requirements.memory;
disc.textContent = gamesF.requirements.storage;
backgroundImages.style.background = `linear-gradient(rgba(0,0,20,.50)0%,#000 100%),url(${gamesF.URLimage})`;
backgroundImages.style.backgroundSize = `cover`;
backgroundImages.style.backgroundPosition = `center`;
