import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

  const menu_btn = document.querySelector(".menu");
const mobile_menu = document.querySelector(".mobile-nav");
menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});

const collapse = document.querySelectorAll(".mobile");
collapse.forEach((element) => {
  element.addEventListener("click", () => {
    mobile_menu.classList.toggle("is-active");
    menu_btn.classList.remove("is-active");
  });
});