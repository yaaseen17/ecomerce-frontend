import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Products from "./views/Products.vue";
import SingleProduct from "./views/SingleProduct";
import Contact from "./views/Contact.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue");
const BoardAdmin = () => import("./views/BoardAdmin.vue");
const Cart = () => import("./components/Cart.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/singleproduct",
    name: "singleproduct",
    component: SingleProduct,
    props: true,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/product",
    name: "product",
    // lazy-loaded
    component: Products,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home", "/product"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
