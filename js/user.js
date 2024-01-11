import { saveUserLog, getRoleUserLog } from "./hellpers.js";

let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let formLogin = document.getElementById("formLogin");
let adminLi = document.getElementById("adminLi");
formLogin.addEventListener("submit", Login);

CheckOrSaveAdmin();
function Login(e) {
  e.preventDefault();
  console.log("Desde login");
  const usuariosRegistrados = JSON.parse(localStorage.getItem("users"));
  if (usuariosRegistrados.length > 0 && usuariosRegistrados !== null) {
    console.log("Existen usuarios registrados");
    const usuarioEncontrado = usuariosRegistrados.find(
      (element) => element.email === inputEmail.value
    );
    if (usuarioEncontrado !== undefined) {
      if (usuarioEncontrado.password === inputPassword.value) {
        const savedUser = {
          email: usuarioEncontrado.email,
          role: usuarioEncontrado.role,
        };
        saveUserLog(savedUser);
        checkAdmin(adminLi);
        formLogin.reset();

        // document.querySelector('.btn.btn-secondary[data-bs-dismiss="modal"]').click()
        $("#exampleModal").modal("hide");
      } else {
        console.log("Email o password incorrectos");
      }
    } else {
      console.log("Email o password incorrectos");
    }
  } else {
    console.log("No exiten usuarios registrados");
  }
}

window.LogOut = function () {
  sessionStorage.removeItem("user");
  adminLi.className = "nav-item d-none";
  window.location.replace("/index.html");
};

export function checkAdmin(adminLi) {
  const role = getRoleUserLog();

  if (role === "Admin") {
    adminLi.className = "nav-item";
  }
}

function CheckOrSaveAdmin() {
  const arrUsers = JSON.parse(localStorage.getItem("users"));
  const userAdmin = {
    email: "comision80i@gmail.com",
    role: "Admin",
    password: "Password_123",
  };
  if (arrUsers === null) {
    const users = [userAdmin];
    localStorage.setItem("users", JSON.stringify(users));
  }else if(arrUsers.length===0){
    const users = [userAdmin];
    localStorage.setItem("users", JSON.stringify(users));
  }
}
