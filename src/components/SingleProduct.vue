<template>
  <div class="card" v-if="newProduct">
    <div class="product-image">
      <img :src="newProduct.img" />
    </div>
    <div class="product-info">
      <h2>{{ newProduct.name }}</h2>

      <div class="price">R{{ newProduct.price }}</div>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/product.services";
export default {
  name: "singleproduct",
  data() {
    return {
      product: this.$route.params.id,
      newProduct: {},
    };
  },
  mounted() {
    this.loading = true;
    ProductService.getsingleProduct(product).then(
      (res) => {
        this.newProduct = res.data;
        this.loading = false;
      },
      (err) => {
        console.error(err);
      }
    );
  },
};
</script>

<style></style>
