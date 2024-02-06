class Usuario {
  constructor(usuario, correo, contraseña, role = "User", favorites = []) {
    this.user = usuario;
    this.email = correo;
    this.password = contraseña;
    this.role = role;
    this.favorites = favorites;
  }
}

document
  .getElementById("createUser")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("inputUser");
    const correoInput = document.getElementById("inputMail");
    const contraseñaInput = document.getElementById("inputPassword");

    const usuario = usuarioInput.value;
    const correo = correoInput.value;
    const contraseña = contraseñaInput.value;

    let usuarios = JSON.parse(localStorage.getItem("users")) || [];

    const usuarioExistente = usuarios.find((user) => user.user === usuario);

    if (usuarioExistente) {
      alert("El nombre de usuario ya está en uso");
      return;
    }

    const correoExistente = usuarios.find((user) => user.email === correo);

    if (correoExistente) {
      alert("El usuario ya existe");
      return;
    }

    const nuevoUsuario = new Usuario(usuario, correo, contraseña);

    usuarios.push(nuevoUsuario);

    localStorage.setItem("users", JSON.stringify(usuarios));

    usuarioInput.value = "";
    correoInput.value = "";
    contraseñaInput.value = "";

    $("#createUserForm").modal("hide");
  });
