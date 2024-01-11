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
  const registerUsers = JSON.parse(localStorage.getItem("users"));
  if (registerUsers.length > 0 && registerUsers !== null) {
    console.log("Existen usuarios registrados");
    const findUser = registerUsers.find(
      (element) => element.email === inputEmail.value
    );
    if (findUser !== undefined) {
      if (findUser.password === inputPassword.value) {
        const savedUser = {
          email: findUser.email,
          role: findUser.role,
        };
        saveUserLog(savedUser);
        checkAdmin(adminLi);
        formLogin.reset();
        document.querySelector('.btn.btn-secondary[data-bs-dismiss="modal"]').click()
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
  sessionStorage.removeItem("user");
  adminLi.className = "nav-item d-none";
  window.location.replace("/index.html");
};

export function checkAdmin(adminLi) {
  const role = getRoleUserLog();

  if (role === "admin") {
    console.log("aplica")
    // adminLi.className = "nav-item";
    adminLi.className = "";
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
