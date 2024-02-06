import { checkAdmin } from "./user.js";
let adminLi = document.getElementById("adminLi");
checkAdmin(adminLi);
class Game {
  constructor(
    code,
    name,
    description,
    price,
    stockQuantity,
    categories,
    URLimage,
    requirements,
    platforms
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.categories = categories;
    this.URLimage = URLimage;
    this.requirements = requirements;
    this.platforms = platforms;
  }

  getCode() {
    return this.code;
  }
  getName() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }
  getPrice() {
    return this.price;
  }
  getStockQuantity() {
    return this.stockQuantity;
  }
  getCategory() {
    return this.categories;
  }
  getImage() {
    return this.URLimage;
  }
  getGeneral() {
    return this.requirements.general;
  }
  getSo() {
    return this.requirements.SO;
  }
  getProcessor() {
    return this.requirements.processor;
  }
  getMemory() {
    return this.requirements.memory;
  }
  getGraphic() {
    return this.requirements.graphic;
  }
  getStorage() {
    return this.requirements.storage;
  }
  getPlatform() {
    return this.platforms;
  }

  setCode(value) {
    this.code = value;
  }
  setName(value) {
    this.name = value;
  }
  setDescription(value) {
    this.description = value;
  }
  setPrice(value) {
    this.price = value;
  }
  setStockQuantity(value) {
    this.stockQuantity = value;
  }
  setCategory(value) {
    this.categories = value;
  }
  setImage(value) {
    this.URLimage = value;
  }
  setGeneral(value) {
    this.requirements.general = value;
  }
  setSo(value) {
    this.requirements.SO = value;
  }
  setProcessor(value) {
    this.requirements.processor = value;
  }
  setMemory(value) {
    this.requirements.memory = value;
  }
  setGraphic(value) {
    this.requirements.graphic = value;
  }
  setStorage(value) {
    this.requirements.storage = value;
  }
  setPlatform(value) {
    this.platforms = value;
  }
}

let gamesFromStorage = localStorage.getItem("games");

let arrGames = gamesFromStorage ? JSON.parse(gamesFromStorage) : [];

let codigoAleatorio = "";

function generarCodigoAleatorio() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < 6; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  codigoAleatorio = codigo;
  return codigo;
}

function crearJuego() {
  let code = generarCodigoAleatorio();
  let name = document.getElementById("inputNewName").value;
  let description = document.getElementById("inputNewDescription").value;
  let price = parseFloat(document.getElementById("inputNewPrice").value);
  let stockQuantity = parseInt(document.getElementById("inputNewStock").value);
  let categories = document.getElementById("inputNewCategory").value.split(",");
  let URLimage = document.getElementById("inputNewImage").value;
  let generalRequirements = document.getElementById(
    "inputNewRequirementsGeneral"
  ).value;
  let SO = document.getElementById("inputNewRequirementsSO").value;
  let processor = document.getElementById(
    "inputNewRequirementsProcessor"
  ).value;
  let memory = document.getElementById("inputNewRequirementsMemory").value;
  let graphic = document.getElementById("inputNewRequirementsGraphic").value;
  let storage = document.getElementById("inputNewRequirementsStorage").value;
  let platform = document.getElementById("inputNewPlatform").value.split(",");

  let game = new Game(
    code,
    name,
    description,
    price,
    stockQuantity,
    categories,
    URLimage,
    {
      general: generalRequirements,
      SO: SO,
      processor: processor,
      memory: memory,
      graphic: graphic,
      storage: storage,
    },
    platform
  );

  return game;
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("crearJuegoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let juegoCreado = crearJuego();

      let existingGameIndex = arrGames.findIndex(
        (g) => g.code === juegoCreado.code
      );
      if (existingGameIndex !== -1) {
        alert("Ya existe un juego con el mismo código.");
        return;
      }
      arrGames.push(juegoCreado);
      let arrGamesJSON = JSON.stringify(arrGames);
      localStorage.setItem("games", arrGamesJSON);
      location.reload();
    });

  let tableBody = document.getElementById("table-body");

  let games = JSON.parse(localStorage.getItem("games")) || [];

  games.forEach((game) => {
    let row = tableBody.insertRow();

    let codeCell = row.insertCell();
    codeCell.textContent = game.code;

    let nameCell = row.insertCell();
    nameCell.textContent = game.name;

    let stockCell = row.insertCell();
    stockCell.textContent = game.stockQuantity;

    let actionsCell = row.insertCell();

    let editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn", "btn-warning");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#modificarModal");
    editButton.onclick = function () {
      document.getElementById("inputCode").value = game.code;
      document.getElementById("inputName").value = game.name;
      document.getElementById("inputDescription").value = game.description;
      document.getElementById("inputPrice").value = game.price;
      document.getElementById("inputStock").value = game.stockQuantity;
      document.getElementById("inputCategory").value = Array.isArray(
        game.categories
      )
        ? game.categories.join(", ")
        : game.categories;
      document.getElementById("inputImage").value = game.URLimage;
      document.getElementById("inputRequirementsGeneral").value =
        game.requirements.general;
      document.getElementById("inputRequirementsSO").value =
        game.requirements.SO;
      document.getElementById("inputRequirementsProcessor").value =
        game.requirements.processor;
      document.getElementById("inputRequirementsMemory").value =
        game.requirements.memory;
      document.getElementById("inputRequirementsGraphic").value =
        game.requirements.graphic;
      document.getElementById("inputRequirementsStorage").value =
        game.requirements.storage;
      document.getElementById("inputPlatform").value = Array.isArray(
        game.platforms
      )
        ? game.platforms.join(", ")
        : game.platforms;
    };
    actionsCell.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.onclick = function () {
      if (confirm("¿Estás seguro de que deseas eliminar este juego?")) {
        let index = arrGames.findIndex((g) => g.code === game.code);
        arrGames.splice(index, 1);
        localStorage.setItem("games", JSON.stringify(arrGames));
        row.remove();
      }
    };
    actionsCell.appendChild(deleteButton);
  });
});

document.getElementById("saveButton").addEventListener("click", function () {
  let newCode = document.getElementById("inputCode").value;
  let newName = document.getElementById("inputName").value;
  let newDescription = document.getElementById("inputDescription").value;
  let newPrice = parseFloat(document.getElementById("inputPrice").value);
  let newStockQuantity = parseInt(document.getElementById("inputStock").value);
  let newCategories = document.getElementById("inputCategory").value.split(",");
  let newURLimage = document.getElementById("inputImage").value;
  let newGeneralRequirements = document.getElementById(
    "inputRequirementsGeneral"
  ).value;
  let newSO = document.getElementById("inputRequirementsSO").value;
  let newProcessor = document.getElementById(
    "inputRequirementsProcessor"
  ).value;
  let newMemory = document.getElementById("inputRequirementsMemory").value;
  let newGraphic = document.getElementById("inputRequirementsGraphic").value;
  let newStorage = document.getElementById("inputRequirementsStorage").value;
  let newPlatform = document.getElementById("inputPlatform").value.split(",");

  let gameIndex = arrGames.findIndex((g) => g.code === newCode);
  if (gameIndex !== -1) {
    arrGames[gameIndex].name = newName;
    arrGames[gameIndex].description = newDescription;
    arrGames[gameIndex].price = newPrice;
    arrGames[gameIndex].stockQuantity = newStockQuantity;
    arrGames[gameIndex].categories = newCategories;
    arrGames[gameIndex].URLimage = newURLimage;
    arrGames[gameIndex].requirements.general = newGeneralRequirements;
    arrGames[gameIndex].requirements.SO = newSO;
    arrGames[gameIndex].requirements.processor = newProcessor;
    arrGames[gameIndex].requirements.memory = newMemory;
    arrGames[gameIndex].requirements.graphic = newGraphic;
    arrGames[gameIndex].requirements.storage = newStorage;
    arrGames[gameIndex].platforms = newPlatform;

    localStorage.setItem("games", JSON.stringify(arrGames));
    location.reload();
  } else {
    alert("No se pudo encontrar el juego en la lista.");
  }
});

document
  .getElementById("crearJuegoModal")
  .addEventListener("shown.bs.modal", function (event) {
    event.preventDefault();
    document.getElementById("inputNewCode").value = generarCodigoAleatorio();
  });
