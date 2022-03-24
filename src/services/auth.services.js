import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://unwanted-kickza.herokuapp.com/auth/";
class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  delete(user) {
    return axios.delete(API_URL + "users/" + user, { headers: authHeader() });
  }
  getUserContent() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }
  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}
export default new AuthService();
