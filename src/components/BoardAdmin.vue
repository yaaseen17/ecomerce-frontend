<template>
  <div class="boarda">
    <h1>Products</h1>
    <table class="rwd-table" v-for="(product, i) in content" :key="product._id">
      <tr>
        <th>name</th>
        <th>Image</th>
        <th>Price</th>
        <th>edit/delete</th>
        <th>New product</th>
      </tr>
      <tr>
        <td data-th="name">{{ product.name }}</td>
        <td data-th="description"><img :src="product.img" /></td>
        <td data-th="Price">R{{ product.price }}</td>
        <td data-th="edit/delete">
          <button
            id="edit"
            type="button"
            class="btn btn-warning w-50"
            @click="changeUpdater(i)"
          >
            Edit
          </button>

          <button
            id="delete"
            type="button"
            class="btn btn-danger w-70 ms-3"
            @click="deleteProduct(product._id)"
          >
            Delete
          </button>
        </td>
        <td data-th="New product">
          <button id="submit-btn" class="addp" @click="toggleModal">
            ADD A PRODUCTS
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
    <h1>Users</h1>
    <table class="rwd-table" v-for="user in users" :key="user._id">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>edit/delete</th>
      </tr>
      <tr>
        <td data-th="name">{{ user.username }}</td>
        <td data-th="Email">R{{ user.email }}</td>
        <td data-th="edit/delete">
          <button @click="deleteUser(user._id)">delete</button>
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
    deleteUser(users) {
      this.loading = true;
      this.$store.dispatch("user/delete", users).then(
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
  margin: 1em 0;
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

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495e;
}

.rwd-table {
  background: #34495e;
  color: #fff;
  border-radius: 0.4em;
  overflow: hidden;
}
.rwd-table tr {
  border-color: #46637f;
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
  color: #dd5;
}
</style>
