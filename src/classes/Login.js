import Swal from "sweetalert2";
import api from "../services/api";
import List from "./List";

class Login {
  constructor() {
    this.user = document.querySelector("#loginModal #user");
    this.password = document.querySelector("#loginModal #loginPassword");

    this.btnLogin = document.querySelector("#loginModal #login-btn");
    this.loginModal = new bootstrap.Modal(
      document.getElementById("loginModal")
    );

    this.sidebarHeading = document.querySelector(".sidebar-heading");
    this.userCredentials;
    this.registerEvent();
    this.isUserLogged();
  }
  registerEvent() {
    this.btnLogin.onclick = () => this.loginRequest();
  }
  async loginRequest() {
    try {
      const body = {
        username: this.user.value,
        password: this.password.value,
      };
      const { data } = await api.post("/login", body);
      localStorage.setItem("user:credentials", JSON.stringify(data));
      this.isUserLogged();
      Swal.fire("Feito!", "Login realizado com sucesso!", "success");
      this.loginModal.hide();
      return data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro no cadastro",
      });
      return error;
    }
  }
  isUserLogged() {
    this.userCredentials = JSON.parse(localStorage.getItem("user:credentials"));

    if (this.userCredentials) {
      new List(this.userCredentials.token);

      this.sidebarHeading.innerHTML = `Olá, ${
        this.userCredentials.user.name.split(" ")[0]
      }`;
    } else {
      this.sidebarHeading.innerHTML = `<a href="#" data-bs-toggle="modal" data-bs-target="#loginModal"
      >Login</a
    >`;
    }
  }
}

export default Login;
