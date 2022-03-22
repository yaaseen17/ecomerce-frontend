<template>
  <header>
    <div class="nav-container">
        <img src="./assets/bg.jpg" alt="">
  
      <nav class="nav" :class="{ active: isActive }">
        <router-link to="/home" @click="toggleNav">
          <font-awesome-icon icon="home" style="color: white" />
          Home
        </router-link>
        <div v-if="showAdminBoard">
          <router-link to="/admin" @click="toggleNav">Admin Board</router-link>
        </div>
        <router-link to="/product" @click="toggleNav">Products</router-link>

        <router-link to="/contact" @click="toggleNav">contact</router-link>
        <div v-if="currentUser">
          <router-link to="/cart" @click="toggleNav">cart</router-link>
        </div>
        <div v-if="!currentUser" class="uni">
          <li class="nav-item">
            <router-link to="/register" @click="toggleNav">
              <font-awesome-icon icon="user-plus" style="color: white" />
              <a href="">Sign Up</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" @click="toggleNav">
              <font-awesome-icon icon="sign-in-alt" style="color: white" />
              <a href="">Login</a>
            </router-link>
          </li>
        </div>
        <div v-if="currentUser" class="uni">
          <li class="nav-item">
            <router-link to="/profile" @click="toggleNav">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />
              <a href="">LogOut</a>
            </a>
          </li>
        </div>
      </nav>
    </div>
    <div class="menu-container">
      <button class="menu" type="button">
        <div class="bar"></div>
      </button>
    </div>
    <div class="mobile-nav">
      <nav class="m-nav" :class="{ active: isActive }">
        <a class="mobile"
          ><router-link to="/home" @click="toggleNav">
            <font-awesome-icon icon="home" style="color: white" />
            Home
          </router-link></a
        >
        <a class="mobile" v-if="showAdminBoard"
          ><router-link to="/admin" @click="toggleNav"
            >Admin Board</router-link
          ></a
        >
        <a class="mobile"
          ><router-link to="/product" @click="toggleNav"
            >Products</router-link
          ></a
        >
        <a class="mobile"
          ><router-link to="/contact" @click="toggleNav"
            >contact</router-link
          ></a
        >
        <a class="mobile" v-if="currentUser"
          ><router-link to="/cart" @click="toggleNav">cart</router-link></a
        >
        <div v-if="!currentUser" class="mobile">
          <li class="nav-item">
            <router-link to="/register" @click="toggleNav">
              <font-awesome-icon icon="user-plus" style="color: white" />
              <a href="">Sign Up</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" @click="toggleNav">
              <font-awesome-icon icon="sign-in-alt" style="color: white" />
              <a href="">Login</a>
            </router-link>
          </li>
        </div>
        <div v-if="currentUser" class="mobile">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link" @click="toggleNav">
              <font-awesome-icon icon="user" />
              <a href="">{{ currentUser.username }} </a>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />
              <a href="">LogOut</a>
            </a>
          </li>
        </div>
      </nav>
    </div>
  </header>
  <div class="view">
    <router-view class="disp" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
  methods: {
    toggleNav() {
      this.isActive = !this.isActive;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.uni {
  margin-left: 40px;
}

.view {
  background-color: rgb(39, 39, 39);
  height: 100%;
}
img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
* {
  box-sizing: border-box;
}

.nav-container {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  width: 100%;
  background: linear-gradient(to right, #000000, #292929);
  position: fixed;
  z-index: 5;
  transition: 0.3s ease-in-out;
}

.nav.scroll {
  background-color: blueviolet;
}
.nav-container svg {
  color: #fff;
  margin-left: 1rem;
}

.menu {
  display: block;

  width: 40px;

  cursor: pointer;

  outline: none;

  appearance: none;

  background: none;

  border: none;

  z-index: 99;
}

.menu .bar,
.menu:before,
.menu:after {
  content: "";

  display: block;

  width: 100%;

  height: 5px;

  margin: 0 auto 5px;

  background-color: #000;

  transition: 0.5s ease-in-out;
}

.menu.is-active:before {
  transform: rotate(45deg) translate(8px, 6px);
}

.menu.is-active:after {
  transform: rotate(-45deg) translate(8px, -6px);
}

.menu.is-active .bar {
  transform: translate(-25px, 0px);
  opacity: 0;
}

.nav {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.scroll {
  background-color: #a1572f;
  color: #eef;
}

.nav router-link {
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  transition: 200ms ease-in-out;
  padding: 20px;
}

nav router-link:hover {
  color: aqua;
}

.mobile-nav {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: -100%;

  background-color: rgba(0, 0, 0, 85%);
  width: 50%;
  height: 100%;
  z-index: 99;
  transition: 0.4s ease-in-out;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.7);
}

.m-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;
}

.m-nav router-link {
  text-decoration: none;
  width: 100%;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  transition: 200ms ease-in-out;
  background-color: rgba(0, 0, 0, 30%);
  padding: 10px;
}

.mobile-nav.is-active {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: 0;
  height: 100%;
  transition: 0.4s ease-in-out;
}
@media only screen and (max-width: 770px) {
  .nav {
    display: none;
  }
  .nav-container {
    display: none;
    box-shadow: none;
    appearance: none;
    margin: 0;
    padding: 0;
  }

  .nav-container svg {
    color: #fff;
    width: 100px;
    margin-left: 1rem;
  }

  .menu-container {
    background-color: transparent;
    width: 100%;
    height: 80px;
    padding: 20px;
    position: fixed;
    top: 1%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 6;
  }
}
@media only screen and (max-width: 2000px) and (min-width: 771px) {
  .menu {
    display: none;
  }
  .mobile-nav {
    display: none;
  }
}
</style>
