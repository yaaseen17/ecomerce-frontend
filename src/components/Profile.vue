<template>
  <div class="containerers">
    <div class="card">
      <div class="img-name">
        <img
          src="https://p7.hiclipart.com/preview/304/305/226/web-development-computer-icons-avatar-business-user-profile.jpg"
          alt="profilna"
        />
        <h2>{{ currentUser.username }}</h2>
      </div>
      <div class="followers">
        <p>
          <strong>Token:</strong>
          {{ currentUser.accessToken.substring(0, 20) }} ...
          {{
            currentUser.accessToken.substr(currentUser.accessToken.length - 20)
          }}
        </p>
        <p>
          <strong>Id:</strong>
          {{ currentUser.id }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ currentUser.email }}
        </p>
      </div>
      <div class="button-follow"></div>
      <div class="auth">
        <strong>Authorities:</strong>
        
          <p v-for="role in currentUser.roles" :key="role">{{ role }}</p>
       
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
<style scoped>
.containerers {
  padding-top: 100px;
  padding-bottom: 100px;
}
.card {
  width: 350px;
  height: fit-content;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #ad0303;
  background: linear-gradient(#000000, #1a1a1a);
  color: rgb(255, 255, 255);
}
.img-name {
  width: 100%;
  height: 210px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 5px solid #ad0303;
  padding-top: 10px;
}
.img-name img {
  display: block;
  width: 140px;
  height: 140px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 70px;
  border: 5px solid #ad0303;
  background-color: rgb(234, 241, 247);
}
.auth {
  text-align: center;
  text-decoration: none;
  list-style: none;
}
.img-name h2 {
  text-align: center;
}
.followers {
  height: 140px;
  padding-top: 50px;
  text-align: center;
}
.followers h3 {
  text-align: center;
}
.button-follow {
  height: 40px;
}
.button-follow button {
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  background-color: rgb(182, 182, 233);
  border-radius: 10px;
  font-size: 18px;
}
.button-follow button:hover {
  background-color: rgb(180, 180, 226);
}
</style>
