<template>
  <div class="form-bg">
    <div class="container">
      <div class="row">
        <div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8">
          <div class="form-container">
            <div class="form-icon">
              <i class="fa fa-user-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="150"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </i>
              <span class="signup"
                ><router-link to="/login">
                  <a href="#" class="signup">Login if you have an account</a>
                </router-link></span
              >
            </div>
            <Form
              @submit="handleRegister"
              :validation-schema="schema"
              class="form-horizontal"
            >
              <div v-if="!successful">
                <h3 class="title">Signup</h3>
                <div class="form-group">
                  <span class="input-icon"><i class="fa fa-envelope"></i></span>
                  <label for="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <span class="input-icon"><i class="fa fa-lock"></i></span>
                  <Field
                    name="email"
                    type="email"
                    class="form-control"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                  <span class="input-icon"><i class="fa fa-lock"></i></span>
                  <label for="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" class="error-feedback" />
                </div>
                <button class="btn signin" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  Sign Up
                </button>
                <div
                  v-if="message"
                  class="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >
                  {{ message }}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
<style scoped>
.form-container {
  background: linear-gradient(#000000, #1a1a1a);
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 0;
  padding: 0 15px;
  border: 1px solid #1a1a1a;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.form-bg {
  padding-top: 100px;
  height: 100vh;
}
.form-container .form-icon {
  color: #ad0303;
  font-size: 13px;
  text-align: center;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 50%;
  padding: 70px 0;
  vertical-align: top;
  display: inline-block;
}
.form-container .form-icon i {
  font-size: 124px;
  margin: 0 0 15px;
  display: block;
}
.form-container .form-icon .signup a {
  color: #fff;
  text-transform: capitalize;
  transition: all 0.3s ease;
}
.form-container .form-icon .signup a:hover {
  text-decoration: underline;
}
.form-container .form-horizontal {
  background: rgb(39, 39, 39);
  width: 50%;
  padding: 60px 30px;
  margin: -20px 0;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: inline-block;
}
.form-container .title {
  color: #ffffff;
  font-size: 23px;
  font-weight: 900;
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  margin: 0 0 30px 0;
}
.form-horizontal .form-group {
  background-color: rgba(255, 255, 255, 0.15);
  margin: 0 0 15px;
  border: 1px solid #b5b5b5;
  border-radius: 20px;
}
.form-horizontal .input-icon {
  color: #b5b5b5;
  font-size: 15px;
  text-align: center;
  line-height: 38px;
  height: 35px;
  width: 40px;
  vertical-align: top;
  display: inline-block;
}
.form-horizontal .form-control {
  color: #b5b5b5;
  background-color: transparent;
  font-size: 14px;
  letter-spacing: 1px;
  width: calc(100% - 55px);
  height: 33px;
  padding: 2px 10px 0 0;
  box-shadow: none;
  border: none;
  border-radius: 0;
  display: inline-block;
  transition: all 0.3s;
}
.form-horizontal .form-control:focus {
  box-shadow: none;
  border: none;
}
.form-horizontal .form-control::placeholder {
  color: #b5b5b5;
  font-size: 13px;
  text-transform: capitalize;
}
.form-horizontal .btn {
  color: rgba(255, 255, 255, 0.8);
  background: #ad0303;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  margin: 0 0 10px 0;
  border: none;
  border-radius: 20px;
  transition: all 0.3s ease;
}
.form-horizontal .btn:hover,
.form-horizontal .btn:focus {
  color: #fff;
  background-color: #ad0303;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.form-horizontal .forgot-pass {
  font-size: 12px;
  text-align: center;
  display: block;
}
.form-horizontal .forgot-pass a {
  color: #999;
  transition: all 0.3s ease;
}
.form-horizontal .forgot-pass a:hover {
  color: #777;
  text-decoration: underline;
}
@media only screen and (max-width: 576px) {
  .form-container {
    padding-bottom: 15px;
  }
  .form-container .form-icon {
    width: 100%;
    padding: 20px 0;
  }
  .form-container .form-horizontal {
    width: 100%;
    margin: 0;
  }
}
@media screen and (max-width: 576px) {
  .form-bg {
    height: fit-content;
  }
}
</style>
