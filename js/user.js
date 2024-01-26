import { saveUserLog, getRoleUserLog } from "./hellpers.js";

let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let formLogin = document.getElementById("formLogin");

let adminLi = document.getElementById("adminLi");
let favoriteLi = document.getElementById("favoriteLi");

let LoginButton = document.querySelectorAll("#LogInButton");
let userName = document.querySelectorAll("#userName");
let logOutButton = document.querySelectorAll("#logOutButton");

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
          user: usuarioEncontrado.user,
          favorites: usuarioEncontrado.favorites,
        };
        // console.log(savedUser)
        saveUserLog(savedUser);
        checkAdmin(adminLi);
        formLogin.reset();

        // document.querySelector('.btn.btn-secondary[data-bs-dismiss="modal"]').click()
        location.reload();
        // $("#exampleModal").modal("hide");
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
  const updateUSers = JSON.parse(localStorage.getItem("users"));
  const actualUser = JSON.parse(sessionStorage.getItem("user"));
  updateUSers.forEach((user) => {
    if (user.email === actualUser.email) {
      user.favorites = actualUser.favorites;
    }
  });
  localStorage.setItem("users", JSON.stringify(updateUSers));
  sessionStorage.removeItem("user");
  adminLi.className = "nav-item d-none";
  favoriteLi.className = "nav-item d-none";

  LoginButton[0].className = "d-block nav-link custom-bg-a mx-2 px-1 rounded";
  LoginButton[1].className = "d-block nav-link custom-bg-a mx-2 px-1 rounded";

  logOutButton[0].className = "nav-link custom-bg-a mx-2 px-1 rounded d-none";
  logOutButton[1].className = "nav-link custom-bg-a mx-2 px-1 rounded d-none";

  window.location.replace("/index.html");
};

export function checkAdmin(adminLi) {
  if (getRoleUserLog() === "invitado") {
    return;
  }
  const { role, user } = getRoleUserLog();
  console.log(role);
  if (role === "admin") {
    console.log("entra para adminLi");
    adminLi.className = "nav-item";
  } else if (role === "user") {
    favoriteLi.className = "nav-item";
  }
  LoginButton[0].className = "d-none nav-link custom-bg-a mx-2 px-1 rounded";
  LoginButton[1].className = "d-none nav-link custom-bg-a mx-2 px-1 rounded";

  logOutButton[0].className = "nav-link custom-bg-a mx-2 px-1 rounded d-block";
  logOutButton[1].className = "nav-link custom-bg-a mx-2 px-1 rounded d-block";
  userName[0].textContent = user;
  userName[1].textContent = user;
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
  } else if (arrUsers.length === 0) {
    const users = [userAdmin];
    localStorage.setItem("users", JSON.stringify(users));
  }
}
window.reloaded = function (consola) {
  location.assign(`./filtro.html#${consola}`);
  location.reload();
};
