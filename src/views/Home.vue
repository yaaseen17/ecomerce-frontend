<template>
  <div class="hm">
    <div class="home-style">
      <div class="to-p">
        <router-link to="/product" class="butt">Let's go shopping</router-link>
      </div>
    </div>
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
.home-style {
  background-image: url(../assets/login-bg-min.jpeg);
  background-size: cover;
  height: 500px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
}
.to-p {
  height: 300px;
  width: 200px;
  justify-content: center;
  padding-top: 200px;
}
.butt {
  text-decoration: none;
  font-family: "Times New Roman", Times, serif;
  font-size: 25px;
  color: black;
  font-weight: 900;
  background-color: rgb(39, 39, 39);
  padding: 5px;
  border-radius: 10px;
}
.butt:hover {
  color: #ad0303;
}
.hm {
  padding-top: 100px;
  padding-bottom: 100px;
  height: 100vh;
}
</style>
