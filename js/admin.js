class Game {
  constructor(
    codigo,
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    urlimg,
    general,
    sistemaOperativo,
    procesador,
    memoria,
    grafica,
    almacenamiento
  ) {
    this._code = codigo;
    this._name = nombre;
    this._description = descripcion;
    this._price = precio;
    this._stockQuantity = stock;
    this._category = categoria;
    this._image = urlimg;
    this._general = general;
    this._so = sistemaOperativo;
    this._processor = procesador;
    this._memory = memoria;
    this._graphic = grafica;
    this._storage = almacenamiento;
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
    const existingGameData = localStorage.getItem(`${this._code}`);

    if (existingGameData) {
      console.log(
        `La entrada con el código ${this._code} ya existe en el localStorage.`
      );
    } else {
      localStorage.setItem(`${this._code}`, JSON.stringify(this));
    }
  }

  // Método para actualizar un juego en el localStorage
  updateLocal() {
    let games = JSON.parse(localStorage.getItem("games")) || [];
    const index = games.findIndex((game) => game._code === this._code);
    if (index !== -1) {
      games[index] = this.toJSON();
      localStorage.setItem("games", JSON.stringify(games));
    }
  }

  // Método para eliminar un juego del localStorage
  deleteLocal() {
    let games = JSON.parse(localStorage.getItem(`${this._code}`)) || {};
    delete games[this._code];
    localStorage.setItem("games", JSON.stringify(games));
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

// Crear una instancia de la clase Game
const exampleGame = new Game(
  "001",
  "Ejemplo Game",
  "Descripción del juego de ejemplo",
  29.99,
  100,
  "Aventura",
  "url_de_la_imagen.jpg",
  "General info del juego",
  "Windows 10",
  "Intel Core i5",
  "8GB RAM",
  "NVIDIA GTX 1060",
  "256GB SSD"
);
const exampleGame2 = new Game(
  "002",
  "Ejemplo Game",
  "Descripción del juego de ejemplo",
  29.99,
  100,
  "Aventura",
  "url_de_la_imagen.jpg",
  "General info del juego",
  "Windows 10",
  "Intel Core i5",
  "8GB RAM",
  "NVIDIA GTX 1060",
  "256GB SSD"
);

exampleGame.saveToLocal();
exampleGame2.saveToLocal();
exampleGame.showFromLocal();
exampleGame2.showFromLocal();
