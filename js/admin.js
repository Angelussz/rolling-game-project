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
    this._requirements = {
      general: general,
      so: sistemaOperativo,
      processor: procesador,
      memory: memoria,
      graphic: grafica,
      storage: almacenamiento,
    };
  }

  // Getters
  get getCode() {
    return this._code;
  }

  get getName() {
    return this._name;
  }

  get getDescription() {
    return this._description;
  }

  get getPrice() {
    return this._price;
  }

  get getStockQuantity() {
    return this._stockQuantity;
  }

  get getCategory() {
    return this._category;
  }

  get getImage() {
    return this._image;
  }

  get getRequirements() {
    return this._requirements;
  }

  // Setters
  set setCode(value) {
    this._code = value;
  }

  set setName(value) {
    this._name = value;
  }

  set setDescription(value) {
    this._description = value;
  }

  set setPrice(value) {
    this._price = value;
  }

  set setStockQuantity(value) {
    this._stockQuantity = value;
  }

  set setCategory(value) {
    this._category = value;
  }

  set setImage(value) {
    this._image = value;
  }

  set setRequirements(value) {
    this._requirements = value;
  }
}

