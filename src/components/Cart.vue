<template>
  <h1>cart</h1>
  <div class="products section">
    <span
      v-show="loading"
      class="spinner-border spinner-border-sm"
      style="width: 100px; height: 100px; color: white"
    ></span>
    <div class="productsContainer">
      <div
        class="card mb-3"
        style="max-width: 540px"
        v-for="(cartItem, i) in cart"
        :key="cartItem._id"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="cartItem.img" class="img" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ cartItem.name }}</h5>
              <p class="card-text">{{ cartItem.description }}</p>
              <div class="d-flex mb-3 align-items-center">
                <h6 class="mx-2">QTY:</h6>
                <input
                  @change="updateQty(cartItem._id, i)"
                  type="number"
                  class="form-control qty"
                  min="1"
                  :value="cartItem.qty"
                />
              </div>
              <p class="card-text">
                TOTAL: R{{ cartItem.price * cartItem.qty }}
              </p>
              <div class="d-flex justify-content-end card-footer">
                <button
                  type="button"
                  class="btn w-20"
                  id="delete"
                  @click="removeItem(cartItem._id)"
                >
                  Remove Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CartService from "../services/cart.services";
export default {
  name: "Cart",
  data() {
    return {
      cart: "",
      loading: false,
    };
  },
  methods: {
    removeItem(product) {
      this.$store.dispatch("cart/deleteOne", product).then(
        (response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          location.reload();
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
    updateQty(product, i) {
      let qty = document.getElementsByClassName("qty")[i].value;
      console.log(qty);
      this.$store.dispatch("cart/update", { _id: product, qty }).then(
        (response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          this.refreshCart();
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
    refreshCart() {
      this.loading = true;
      CartService.getCart().then(
        (response) => {
          this.cart = response.data;
          this.loading = false;
        },
        (error) => {
          this.cart =
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
    this.refreshCart();
  },
};
</script>
<style scoped>
img {
  width: 200px;
  height: 200px;
}
.section {
  min-height: 100vh;
}

.products {
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}
</style>
