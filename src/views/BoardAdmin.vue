<template>
  <div class="boarda">
    <h1 class="admin-head">Products</h1>
    <table class="rwd-table">
      <button id="submit-btn" class="btn btn-danger w-30 ms-3" @click="toggleModal">
            ADD A PRODUCTS
          </button>
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Price</th>
        <th>Edit/Delete</th>
      </tr>
      <tr v-for="(product, i) in content" :key="product._id">
        <td data-th="Name">{{ product.name }}</td>
        <td data-th="Image"><img :src="product.img" /></td>
        <td data-th="Price">R{{ product.price }}</td>
        <td data-th="Edit/Delete">
          <button
            id="edit"
            type="button"
            class="btn btn-secondary w-30"
            @click="changeUpdater(i)"
          >
            Edit
          </button>

          <button
            id="delete"
            type="button"
            class="btn btn-danger w-30 ms-3"
            @click="deleteProduct(product._id)"
          >
            Delete
          </button>
        </td>
        
      </tr>
    </table>
    <div>
      <Modal @clicked="toggleModal" v-if="showModal" />
      <Updatemodal
        :updateContent="updateContent"
        @clicked="toggleModal2"
        v-if="showModal2"
      />
    </div>
    <h1 class="admin-head">Users</h1>
    <table class="rwd-table">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
      <tr v-for="user in users" :key="user._id">
        <td data-th="Name">{{ user.username }}</td>
        <td data-th="Email">{{ user.email }}</td>
        <td data-th="Delete">
          <button class="btn btn-danger w-30 ms-3" @click="deleteUser(user._id)">delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import UserService from "../services/user.services";
import Updatemodal from "../components/Updatemodal.vue";
import AuthService from "../services/auth.services";
export default {
  components: { Modal, Updatemodal },
  name: "Products",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      content: "",
      users: "",
      showModal: false,
      showModal2: false,
      updateContent: "",
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2;
    },
    changeUpdater(i) {
      this.updateContent = this.content[i];
      this.showModal2 = !this.showModal2;
    },
    deleteProduct(product) {
      this.loading = true;
      this.$store.dispatch("product/delete", product).then(
        () => {
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
    deleteUser(user) {
      this.loading = true;
      this.$store.dispatch("auth/delete", user).then(
        () => {
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
  },
  mounted() {
    this.loading = true;
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
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
    AuthService.getUserContent().then(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        this.users =
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
.admin-head {
  color: #ad0303;
  text-align: center;
}
.boarda {
  padding-top: 100px;
  padding-bottom: 100px;
}
img {
  width: 50px;
  height: 50px;
}
@import "https://fonts.googleapis.com/css?family=Montserrat:300,400,700";
.rwd-table {
  margin: 1em auto;
  min-width: 300px;
}
.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.rwd-table th {
  display: none;
}
.rwd-table td {
  display: block;
}
.rwd-table td:first-child {
  padding-top: 0.5em;
}
.rwd-table td:last-child {
  padding-bottom: 0.5em;
}
.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 6.5em;
  display: inline-block;
}
@media (min-width: 480px) {
  .rwd-table td:before {
    display: none;
  }
}
.rwd-table th,
.rwd-table td {
  text-align: left;
}
@media (min-width: 480px) {
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: 0.25em 0.5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
}

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #444;
  background: #eee;
}

.rwd-table {
  background: #000000;
  color: #fff;
  border-radius: 0.4em;
  overflow: hidden;
}
.rwd-table tr {
  border-color: #292929;
}
.rwd-table th,
.rwd-table td {
  margin: 0.5em 1em;
}
@media (min-width: 480px) {
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th,
.rwd-table td:before {
  color: #ffffff;
}
</style>
