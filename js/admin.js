class Game {
  constructor(...args) {
    [
      this._code,
      this._name,
      this._description,
      this._price,
      this._stockQuantity,
      this._category,
      this._image,
      this._general,
      this._so,
      this._processor,
      this._memory,
      this._graphic,
      this._storage,
    ] = args;
  }
  // Getters
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

  // Setters
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

  // Método para guardar un juego en el localStorage
  saveToLocal() {
    const existingGameData = localStorage.getItem(this._code);

    if (existingGameData) {
      console.log(
        `La entrada con el código ${this._code} ya existe en el localStorage.`
      );
    } else {
      localStorage.setItem(this._code, JSON.stringify(this));
    }
  }
  // Método para actualizar un juego en el localStorage
  updateLocal() {
    const existingGameData = localStorage.getItem(this._code);

    if (existingGameData) {
      localStorage.setItem(this._code, JSON.stringify(this));
    } else {
      console.log(
        `La entrada con el código ${this._code} NO existe en el localStorage.`
      );
    }
  }
  // Método para eliminar un juego del localStorage
  deleteLocal() {
    const existingGameData = localStorage.getItem(this._code);

    if (existingGameData) {
      localStorage.removeItem(this._code);
    } else {
      console.log(
        `La entrada con el código ${this._code} NO existe en el localStorage.`
      );
    }
  }

  showFromLocal() {
    const game = localStorage.getItem(`${this._code}`);

    if (game) {
      const formattedGame = JSON.stringify(JSON.parse(game), null, 2);

      console.log(
        `Datos del juego con código ${this._code} en localStorage:\n${formattedGame}`
      );
    } else {
      console.log(
        `No se encontraron datos para el juego con código ${this._code} en localStorage.`
      );
    }
  }
}

function getElementValue(id) {
  return document.getElementById(id).value.trim();
}

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

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const game = createGameFromForm();
  resetForm();
  console.log(game.showFromLocal());
});
