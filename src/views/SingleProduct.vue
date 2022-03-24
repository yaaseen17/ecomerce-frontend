<template>
  <div class="card">
    <div class="product-image">
      <img :src="product.img" />
    </div>
    <div class="product-info">
      <h2>{{ product.name }}</h2>

      <div class="price">R{{ product.price }}</div>
      <input type="number" class="" value="1" min="1" :id="`qty${i}`" />
      <button @click="addToCart(product, i)" class="buy-btn">Buy Now</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "singleproduct",
  data() {
    return {
      id: this.$route.params.id,
      product: {},
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
    fetch("https://unwanted-kickza.herokuapp.com/products/" + this.id)
      .then((res) => res.json())
      .then((data) => {
        this.product = data;
        console.log(this.product);
      });
  },
};
</script>

<style></style>
