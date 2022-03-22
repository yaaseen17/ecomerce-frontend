<template>
  <div class="card" v-for="product in content" :key="product._id">
    <div class="product-image">
      <img :src="product.img" />
    </div>
    <div class="product-info">
      <h2>{{ product.name }}</h2>

      <div class="price">R{{ product.price }}</div>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/product.services";
export default {
  name: "singleproduct",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.loading = true;
    ProductService.getsingleProduct(product).then(
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

<style></style>
