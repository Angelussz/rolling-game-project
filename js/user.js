import { saveUserLog, getRoleUserLog } from "./hellpers.js";

let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let formLogin = document.getElementById("formLogin");
let adminLi = document.getElementById("adminLi");
let wishLi = document.getElementById("wishLi")
let loginButton1 = document.getElementById("loginButton1");
let loginButton2 = document.getElementById("loginButton2");
let logOutButton1 = document.getElementById("logout1");
let logOutButton2 = document.getElementById("logout2");
let userName1 = document.getElementById("user-name1");
let userName2 = document.getElementById("user-name2");
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
          user: findUser.user
        };
        saveUserLog(savedUser);
        checkAdmin();
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
  wishLi.className = "nav-item d-none";
  loginButton1 = "nav-item";
  loginButton2 = "nav-item";
  
  logOutButton1 = "nav-item d-none";
  logOutButton2 = "nav-item d-none";

  userName1 = "d-none";
  userName2 = "d-none";

  
  
  window.location.replace("/index.html");
};
// ChecAdmin tenia parametros revisar las exportaciones de este
export function checkAdmin() {
  const {user,role} = getRoleUserLog();

  if (role === "admin") {
    console.log("aplica");
    // adminLi.className = "nav-item";
    adminLi.className = "";
  }
  else if(role === "user"){
    console.log("aplica user");
    wishLi.className = "";
  }
  loginButton1.className = "d-none";
  loginButton2.className = "d-none";
  userName1.textContent = user;
  userName2.textContent = user;
  userName1.className = "";
  userName2.className = "";
  logOutButton1.className = "nav-link";
  logOutButton2.className = "nav-link";
  
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
