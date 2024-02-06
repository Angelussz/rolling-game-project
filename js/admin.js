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
    this._code = code;
    this._name = name;
    this._description = description;
    this._price = price;
    this._stockQuantity = stockQuantity;
    this._categories = categories;
    this._URLimage = URLimage;
    this._requirements = requirements;
    this._platforms = platforms;
  }

  getCode() {
    return this._code;
  }
  getName() {
    return this._name;
  }
  getDescription() {
    return this._description;
  }
  getPrice() {
    return this._price;
  }
  getStockQuantity() {
    return this._stockQuantity;
  }
  getCategory() {
    return this._categories;
  }
  getImage() {
    return this._URLimage;
  }
  getGeneral() {
    return this._requirements.general;
  }
  getSo() {
    return this._requirements.SO;
  }
  getProcessor() {
    return this._requirements.processor;
  }
  getMemory() {
    return this._requirements.memory;
  }
  getGraphic() {
    return this._requirements.graphic;
  }
  getStorage() {
    return this._requirements.storage;
  }
  getPlatform() {
    return this._platforms;
  }

  setCode(value) {
    this._code = value;
  }
  setName(value) {
    this._name = value;
  }
  setDescription(value) {
    this._description = value;
  }
  setPrice(value) {
    this._price = value;
  }
  setStockQuantity(value) {
    this._stockQuantity = value;
  }
  setCategory(value) {
    this._categories = value;
  }
  setImage(value) {
    this._URLimage = value;
  }
  setGeneral(value) {
    this._requirements.general = value;
  }
  setSo(value) {
    this._requirements.SO = value;
  }
  setProcessor(value) {
    this._requirements.processor = value;
  }
  setMemory(value) {
    this._requirements.memory = value;
  }
  setGraphic(value) {
    this._requirements.graphic = value;
  }
  setStorage(value) {
    this._requirements.storage = value;
  }
  setPlatform(value) {
    this._platforms = value;
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
        (g) => g._code === juegoCreado._code
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
    codeCell.textContent = game._code;

    let nameCell = row.insertCell();
    nameCell.textContent = game._name;

    let stockCell = row.insertCell();
    stockCell.textContent = game._stockQuantity;

    let actionsCell = row.insertCell();

    let editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn", "btn-warning");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#modificarModal");
    editButton.onclick = function () {
      document.getElementById("inputCode").value = game._code;
      document.getElementById("inputName").value = game._name;
      document.getElementById("inputDescription").value = game._description;
      document.getElementById("inputPrice").value = game._price;
      document.getElementById("inputStock").value = game._stockQuantity;
      document.getElementById("inputCategory").value = Array.isArray(
        game._categories
      )
        ? game._categories.join(", ")
        : game._categories;
      document.getElementById("inputImage").value = game._URLimage;
      document.getElementById("inputRequirementsGeneral").value =
        game._requirements.general;
      document.getElementById("inputRequirementsSO").value =
        game._requirements.SO;
      document.getElementById("inputRequirementsProcessor").value =
        game._requirements.processor;
      document.getElementById("inputRequirementsMemory").value =
        game._requirements.memory;
      document.getElementById("inputRequirementsGraphic").value =
        game._requirements.graphic;
      document.getElementById("inputRequirementsStorage").value =
        game._requirements.storage;
      document.getElementById("inputPlatform").value = Array.isArray(
        game._platforms
      )
        ? game._platforms.join(", ")
        : game._platforms;
    };
    actionsCell.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.onclick = function () {
      if (confirm("¿Estás seguro de que deseas eliminar este juego?")) {
        let index = arrGames.findIndex((g) => g._code === game._code);
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

  let gameIndex = arrGames.findIndex((g) => g._code === newCode);
  if (gameIndex !== -1) {
    arrGames[gameIndex]._name = newName;
    arrGames[gameIndex]._description = newDescription;
    arrGames[gameIndex]._price = newPrice;
    arrGames[gameIndex]._stockQuantity = newStockQuantity;
    arrGames[gameIndex]._categories = newCategories;
    arrGames[gameIndex]._URLimage = newURLimage;
    arrGames[gameIndex]._requirements.general = newGeneralRequirements;
    arrGames[gameIndex]._requirements.SO = newSO;
    arrGames[gameIndex]._requirements.processor = newProcessor;
    arrGames[gameIndex]._requirements.memory = newMemory;
    arrGames[gameIndex]._requirements.graphic = newGraphic;
    arrGames[gameIndex]._requirements.storage = newStorage;
    arrGames[gameIndex]._platforms = newPlatform;

    localStorage.setItem("games", JSON.stringify(arrGames));
    location.reload();
  } else {
    alert("No se pudo encontrar el juego en la lista.");
  }
});

document
  .getElementById("crearJuegoModal")
  .addEventListener("shown.bs.modal", function (event) {
    document.getElementById("inputNewCode").value = generarCodigoAleatorio();
  });
