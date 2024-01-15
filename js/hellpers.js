export function validarInputRequerido(input) {
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarInputDescripcion(input) {
  if (input.value.trim().length >= 10 && input.value.trim().length <= 200) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarInputPrecio(input) {
  const regExPrecio = /^(\d{1,9}(?:\,\d{1,2})?|\d{1,2}(?:\,\d{1,2})?)$/;
  if (regExPrecio.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarInputUrl(input) {
  const regExURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

  if (regExURL.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarTodo(
  inpCodigo,
  inpNombre,
  inpDescripcion,
  inpPrecio,
  inpUrl
) {
  if (
    validarInputRequerido(inpCodigo) &&
    validarInputRequerido(inpNombre) &&
    validarInputDescripcion(inpDescripcion) &&
    validarInputPrecio(inpPrecio) &&
    validarInputUrl(inpUrl)
  ) {
    return true;
  } else {
    return false;
  }
}

export function CodigoAleatorio() {
  const regCode = JSON.parse(localStorage.getItem("regCode")) || [];
  let repeat;
  let code;

  do {
    repeat = false;
    console.log("Entro en el do");
    code = parseInt(Math.random() * 10);

    for (let index = 0; index <= regCode.length; index++) {
      if (code === regCode[index]) {
        console.log("El codigo existe-->", code);
        if (index === regCode.length - 1) {
          console.log("se agoto el maximo de numeros");
          repeat = false;
        } else {
          console.log("pedimos un nuevo nuevo numero--break");
          repeat = true;
          break;
        }
      }
    }
    console.log("Valor de repeat-->", repeat);
  } while (repeat);
  regCode.push(code);
  localStorage.setItem("regCode", JSON.stringify(regCode));
  return code;
}

export function ObtenerCodigoAleatorio() {
  return window.crypto.randomUUID();
}

export function getRoleUserLog() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user !== null) {
    return user.role;
  } else {
    return "invitado";
  }
}

export function saveUserLog(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}
