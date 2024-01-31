class Game {
  constructor(
    code,
    name,
    description,
    price,
    stockQuantity,
    category,
    image,
    general,
    so,
    processor,
    memory,
    graphic,
    storage
  ) {
    this._code = code;
    this._name = name;
    this._description = description;
    this._price = price;
    this._stockQuantity = stockQuantity;
    this._category = category;
    this._image = image;
    this._general = general;
    this._so = so;
    this._processor = processor;
    this._memory = memory;
    this._graphic = graphic;
    this._storage = storage;
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
    return this._category;
  }
  getImage() {
    return this._image;
  }
  getGeneral() {
    return this._general;
  }
  getSo() {
    return this._so;
  }
  getProcessor() {
    return this._processor;
  }
  getMemory() {
    return this._memory;
  }
  getGraphic() {
    return this._graphic;
  }
  getStorage() {
    return this._storage;
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
    this._category = value;
  }
  setImage(value) {
    this._image = value;
  }
  setGeneral(value) {
    this._general = value;
  }
  setSo(value) {
    this._so = value;
  }
  setProcessor(value) {
    this._processor = value;
  }
  setMemory(value) {
    this._memory = value;
  }
  setGraphic(value) {
    this._graphic = value;
  }
  setStorage(value) {
    this._storage = value;
  }

  saveToLocal() {
    if (localStorage.getItem(this._code)) {
      console.log(
        `La entrada con el código ${this._code} ya existe en el localStorage.`
      );
    } else {
      localStorage.setItem(this._code, JSON.stringify(this));
    }
  }

  updateLocal() {
    localStorage.setItem(this._code, JSON.stringify(this));
  }

  deleteLocal() {
    localStorage.removeItem(this._code);
  }

  showFromLocal() {
    console.log(JSON.stringify(this));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const gamesData = [
    {
      code: "001",
      name: "Juego 1",
      description: "Descripción del Juego 1",
      price: 29.99,
      stockQuantity: 100,
      category: "Aventura",
      image: "imagen1.jpg",
      general: "General 1",
      so: "Windows",
      processor: "Intel i5",
      memory: "8GB RAM",
      graphic: "NVIDIA GTX 1050",
      storage: "256GB SSD",
    },
    {
      code: "002",
      name: "Juego 2",
      description: "Descripción del Juego 2",
      price: 39.99,
      stockQuantity: 50,
      category: "Acción",
      image: "imagen2.jpg",
      general: "General 2",
      so: "MacOS",
      processor: "AMD Ryzen 7",
      memory: "16GB RAM",
      graphic: "AMD RX 5700",
      storage: "512GB SSD",
    },
    {
      code: "003",
      name: "Juego 3",
      description: "Descripción del Juego 3",
      price: 19.99,
      stockQuantity: 200,
      category: "Estrategia",
      image: "imagen3.jpg",
      general: "General 3",
      so: "Linux",
      processor: "Intel i3",
      memory: "4GB RAM",
      graphic: "Integrated Graphics",
      storage: "128GB HDD",
    },
  ];

  gamesData.forEach((gameData) =>
    new Game(...Object.values(gameData)).saveToLocal()
  );

  const localStorageData = Object.entries(localStorage);
  const tableBody = document.getElementById("table-body");

  for (const [key, value] of localStorageData) {
    const loadedGame = new Game(...Object.values(JSON.parse(value)));

    const row = tableBody.insertRow();
    row.insertCell(0).textContent = key;
    row.insertCell(1).textContent = loadedGame.getName();

    const actionCell = row.insertCell(2);

    const modifyButton = createButton("Modificar", "warning", () => {
      const formFields = {
        inputCode: "Code",
        inputName: "Name",
        inputDescription: "Description",
        inputPrice: "Price",
        inputStock: "StockQuantity",
        inputCategory: "Category",
        inputImage: "Image",
        inputRequirementsGeneral: "General",
        inputRequirementsSO: "So",
        inputRequirementsProcessor: "Processor",
        inputRequirementsMemory: "Memory",
        inputRequirementsGraphic: "Graphic",
        inputRequirementsStorage: "Storage",
      };

      for (const [fieldId, suffix] of Object.entries(formFields)) {
        document.getElementById(fieldId).value = loadedGame[`get${suffix}`]();
      }
    });

    const deleteButton = createButton("Eliminar", "danger", () => {
      console.log(`Abrir modal para eliminar juego con código ${key}`);
      document
        .getElementById("confirmarEliminar")
        .addEventListener("click", function () {
          deleteGame(key);
          row.remove();
          $("#eliminarModal").modal("hide");
        });
    });

    actionCell.appendChild(modifyButton);
    actionCell.appendChild(deleteButton);
  }
});

function createGameFromForm() {
  const newGame = new Game(
    getElementValue("inputCode"),
    getElementValue("inputName"),
    getElementValue("inputDescription"),
    getElementValue("inputPrice"),
    getElementValue("inputStock"),
    getElementValue("inputCategory"),
    getElementValue("inputImage"),
    getElementValue("inputRequirementsGeneral"),
    getElementValue("inputRequirementsSO"),
    getElementValue("inputRequirementsProcessor"),
    getElementValue("inputRequirementsMemory"),
    getElementValue("inputRequirementsGraphic"),
    getElementValue("inputRequirementsStorage")
  );

  newGame.saveToLocal();
  return newGame;
}

function resetForm() {
  const inputIds = [
    "inputCode",
    "inputName",
    "inputDescription",
    "inputPrice",
    "inputStock",
    "inputCategory",
    "inputImage",
    "inputRequirementsGeneral",
    "inputRequirementsSO",
    "inputRequirementsProcessor",
    "inputRequirementsMemory",
    "inputRequirementsGraphic",
    "inputRequirementsStorage",
  ];

  inputIds.forEach((id) => {
    document.getElementById(id).value = "";
  });
}

function createButton(text, color, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("btn", `btn-${color}`, "btn-sm");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", `#${text.toLowerCase()}Modal`);
  button.addEventListener("click", clickHandler);
  return button;
}

function deleteGame(code) {
  new Game(
    ...Object.values(JSON.parse(localStorage.getItem(code)))
  ).deleteLocal();
}

function getElementValue(id) {
  return document.getElementById(id).value.trim();
}

document
  .getElementById("saveButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const updatedGame = createGameFromForm();

    if (localStorage.getItem(updatedGame.getCode())) {
      updatedGame.updateLocal();
      console.log(
        `Datos actualizados para el juego con código ${updatedGame.getCode()}`
      );
      location.reload();
    } else {
      console.log(
        `El juego con código ${updatedGame.getCode()} no existe en el localStorage.`
      );
    }
    resetForm();
  });

function updateTableRow(updatedGame) {
  const tableBody = document.getElementById("table-body");

  for (let i = 0; i < tableBody.rows.length; i++) {
    const row = tableBody.rows[i];
    if (row.cells[0].textContent === updatedGame.getCode()) {
      row.cells[1].textContent = updatedGame.getName();
      break;
    }
  }
}
