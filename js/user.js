import { saveUserLog, getRoleUserLog } from "./hellpers.js";

let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let formLogin = document.getElementById("formLogin");

let adminLi = document.getElementById("adminLi");
let favoriteLi = document.getElementById("favoriteLi");

let LoginButton = document.querySelectorAll("#LogInButton");
let userName = document.querySelectorAll("#userName");
let logOutButton = document.querySelectorAll("#logOutButton");
let logIncorrectMsg = document.getElementById("incorrectMsg");
let btnClose = document.getElementById("btnClose");
let modal = document.getElementById("exampleModal");
let btnClose2 = document.getElementById("btnSecondaryClose");
// btnSecondaryClose
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
    console.log(usuarioEncontrado);
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
        inputEmail.classList.add("border-danger");
        inputPassword.classList.add("border-danger");
        logIncorrectMsg.className = "text-danger";
      }
    } else {
      console.log("Email o password incorrectos");
      inputEmail.classList.add("border-danger");
      inputPassword.classList.add("border-danger");
      logIncorrectMsg.className = "text-danger";
    }
  } else {
    console.log("No exiten usuarios registrados");
    inputEmail.classList.add("border-danger");
    inputPassword.classList.add("border-danger");
    logIncorrectMsg.className = "text-danger";
    logIncorrectMsg.textContent = "No existen usuarios registrados";
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
  let actualUrl = window.location.href;
  if(actualUrl.includes("favorite.html") || actualUrl.includes("Administrador.html")){
    window.location.replace("/index.html");
  }
  else{
    location.reload();
  }
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
  const users = [
    {
      user: "grupo4 comision80",
      email: "grupo4@gmail.com",
      password: "grupo4_password",
      role: "admin",
      favorites: [],
    },
    {
      user: "user4 comision80",
      email: "user4@gmail.com",
      password: "user4_password",
      role: "user",
      favorites: [],
    },
  ];
  const games = [
    {
      code: 1,
      name: "The Lamplighters League",
      description:
        "Recluta a un equipo de inadaptados con habilidades únicas y personalidades inolvidables, y persigue a Banished Court hasta los confines de la Tierra en una combinación de infiltración, combate por turnos y una historia de aventuras e intrigas.",
      price: "28.24",
      stockQuantity: "20",
      category: ["aventura", "rol", "estrategia"],
      URLimage:
        "https://aor-images-prod.s3.amazonaws.com/ajwckdtg7v56yrz9tg4jn6eiw78q",
      requirements: {
        general: "Requiere un procesador y un sistema operativo de 64 bits",
        SO: "Windows® 10 Home 64 Bit",
        processor: "Intel® Core™ i5-3570K or AMD® Ryzen™ 3 2300X",
        memory: "8 GB de RAM",
        grafic:
          "Gráficos: AMD® Radeon™ R9 380 (4GB) or Nvidia® GeForce™ GTX 950 (2GB)",
        storage: "16 GB de espacio disponible",
      },
      platforms: ["PC", "XBOX"],
    },
    {
      code: 2,
      name: "Firewatch",
      description:
        "Firewatch es un juego de misterio en primera persona para un jugador que se desarrolla en la selva de Wyoming.",
      price: "1.16",
      stockQuantity: "30",
      category: ["aventura", "misterio", "casual"],
      URLimage:
        "https://cdn.akamai.steamstatic.com/steam/apps/383870/capsule_616x353.jpg?t=1688484486",
      requirements: {
        general: "Requiere un procesador y un sistema operativo de 64 bits",
        SO: "Windows 7 or higher 64bit",
        processor: "Intel Core i3 2.00 GHz or AMD equivalent",
        memory: "6 GB de RAM",
        grafic: "NVIDIA GeForce 450 or higher with 1GB Memory",
        storage: "4 GB de espacio disponible",
      },
      platforms: ["PC"],
    },
    {
      code: 3,
      name: "Fallout 4",
      description:
        "Eres el único superviviente del Refugio 111 en un mundo destruido por la guerra nuclear. Cada segundo es una lucha por la supervivencia, y en tus manos estarán todas las decisiones. Solo tú puedes reconstruir el yermo y decidir su futuro. Bienvenido a casa.",
      price: "15.95",
      stockQuantity: "16",
      category: ["accion", "aventura", "supervivencia"],
      URLimage:
        "https://cdnb.artstation.com/p/assets/images/images/029/978/775/large/isa-osa-.jpg?1599216317",
      requirements: {
        general: "Requiere un procesador y un sistema operativo de 64 bits",
        SO: "Windows 7/8/10 (64-bit OS required)",
        processor:
          "Intel Core i5-2300 2.8 GHz/AMD Phenom II X4 945 3.0 GHz or equivalent",
        memory: "8 GB de RAM",
        grafic: "NVIDIA GTX 550 Ti 2GB/AMD Radeon HD 7870 2GB or equivalent",
        storage: "30 GB de espacio disponible",
      },
      platforms: ["XBOX"],
    },
    {
      code: 4,
      name: "Football Manager 2024",
      description:
        "Confecciona un equipo de talla mundial que tumbe a los rivales en las competiciones de fútbol más prestigiosas. El progreso nunca se detiene cuando persigues la excelencia.",
      price: "43.00",
      stockQuantity: "50",
      category: ["deportes", "futbol", "estrategia"],
      URLimage: "https://wallpapercave.com/wp/wp12862731.jpg",
      requirements: {
        general: "Requiere un procesador y un sistema operativo de 64 bits",
        SO: "Windows 10/11 with updates - 64 bit",
        processor: "Intel Core 2 or AMD Athlon 64 X2",
        memory: "4 GB de RAM",
        grafic:
          "Intel GMA X4500, NVIDIA GeForce 9600M GT, AMD/ATI Mobility Radeon HD 3650 - requires 256MB VRAM and DirectX® 11",
        storage: "7 GB de espacio disponible",
      },
      platforms: ["PC", "PS4"],
    },
    {
      code: 5,
      name: "Backpack Hero",
      description:
        "¡El roguelike con manejo de inventario! Recoge objetos raros, organiza tu mochila y derrota a tus oponentes!",
      price: "9.30",
      stockQuantity: "14",
      category: ["estrategia", "fantasia", "construcción", "aventura"],
      URLimage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNAOsqRiH1mEs08EvxeOamvPxXJvrx6SHGJQ",
      requirements: {
        general: "Requiere un procesador y un sistema operativo de 64 bits",
        SO: "Windows 7 (SP1+), Windows 10 and Windows 11",
        processor: "1.1 GHz Processor",
        memory: "1 GB de RAM",
        grafic: "DX10, DX11, DX12 capable.",
        storage: "250 MB de espacio disponible",
      },
      platforms: ["PS4"],
    },
  ];
  try {
    const arrUsers = JSON.parse(localStorage.getItem("users"));
    if (arrUsers === null) {
      localStorage.setItem("users", JSON.stringify(users));
    } else if (arrUsers.length === 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  } catch (error) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  try {
    const arrGames = JSON.parse(localStorage.getItem("games"));
    if (arrGames === null) {
      localStorage.setItem("games", JSON.stringify(games));
    } else if (arrGames.length === 0) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  } catch (error) {
    localStorage.setItem("games", JSON.stringify(games));
  }
}
window.reloaded = function (consola) {
  location.assign(`./filtro.html#${consola}`);
  location.reload();
};

btnClose.addEventListener("click", () => {
  inputEmail.classList.remove("border-danger");
  inputPassword.classList.remove("border-danger");
  logIncorrectMsg.className = "d-none text-danger";
  formLogin.reset();
});
btnClose2.addEventListener("click", () => {
  inputEmail.classList.remove("border-danger");
  inputPassword.classList.remove("border-danger");
  logIncorrectMsg.className = "d-none text-danger";
  formLogin.reset();
});
modal.addEventListener("click", (e) => {
  if (e.target.className === "modal fade show") {
    inputEmail.classList.remove("border-danger");
    inputPassword.classList.remove("border-danger");
    logIncorrectMsg.className = "d-none text-danger";
    formLogin.reset();
  }
});
