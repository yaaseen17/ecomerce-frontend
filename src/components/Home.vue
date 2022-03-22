<template>
  <div class="hm">
    <router-link to="/product"><button>Let's go shopping</button></router-link>
  </div>
</template>

<script>
import UserService from "../services/user.services";
export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.dlata &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
<style scoped>
.hm {
  padding-top: 100px;
  padding-bottom: 100px;
  height: 100vh;
}
</style>
