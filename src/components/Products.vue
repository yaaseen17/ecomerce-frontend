<template>
  <div class="containerr">
    <div class="card" v-for="product in content" :key="product.id">
      <div class="product-image">
        <img :src="product.img" />
      </div>
      <div class="product-info">
        <h2>{{ product.name }}</h2>

        <div class="price">R{{ product.price }}</div>
      </div>
      <input
        type="number"
        class="form-control"
        value="1"
        min="1"
        :id="`qty${i}`"
      />
      <button @click="addToCart(product, i)" class="buy-btn">Buy Now</button>

      <router-link :to="{ path: `/singleproduct` }"
        ><button>Read more</button></router-link
      >
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.services";
export default {
  name: "product",

  data() {
    return {
      content: "",
    };
  },
  methods: {
    addToCart(product, i) {
      let qty = document.querySelector(`#qty${i}`).value;
      this.$store.dispatch("cart/add", { _id: product._id, qty }).then(
        (response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  mounted() {
    this.loading = true;
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
        this.loading = false;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

button {
  font-family: "Montserrat", sans-serif;
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 0.2rem;
  color: var(--text);
  cursor: pointer;
}

input {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  width: 20%;
  border: transparent;
  margin: auto;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
  height: 100%;
  user-select: none;
  border-radius: 10px;
}

/*===== CARD =====*/

.card {
  position: relative;
  padding: 1rem;
  width: 350px;
  height: 450px;
  box-shadow: -1px 15px 30px -12px rgb(32, 32, 32);
  border-radius: 0.9rem;
  color: white;
  cursor: pointer;
  background-color: #000000;
}

.product-image {
  height: 200px;
  width: 100%;
  margin: auto 50px;
  filter: drop-shadow(5px 10px 15px rgba(8, 9, 13, 0.4));
}
.product-info {
  text-align: center;
}

.product-info h2 {
  font-size: 1.4rem;
  font-weight: 600;
}
.product-info p {
  margin: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
}
.price {
  font-size: 1.2rem;
  font-weight: 500;
}
.btn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.8rem;
}
.buy-btn {
  background-color: var(--btn);
  padding: 0.6rem 3.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: 300ms ease;
}
.buy-btn:hover {
  background-color: var(--btn-hover);
}
.fav {
  box-sizing: border-box;
  background: rgb(0, 0, 0);
  border: 1px solid#000;
  display: grid;
  place-items: center;
}

.fav:hover .svg {
  fill: #000;
}
.containerr {
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
@media screen and (max-width: 800px) {
  body {
    height: auto;
  }
  .containerr {
    padding: 2rem 0;
    width: 100%;
    flex-direction: column;
    gap: 3rem;
  }
}
</style>
