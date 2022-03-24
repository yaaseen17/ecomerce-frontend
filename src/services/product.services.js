import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://unwanted-kickza.herokuapp.com/products/";
class ProductService {
  async create(product) {
    return axios.post(
      API_URL,
      {
        name: product.name,
        price: product.price,
        description: product.description,
        img: product.img,
        brand: product.brand,
        size: product.size,
      },
      { headers: authHeader() }
    );
  }
  delete(product) {
    return axios.delete(API_URL + product, { headers: authHeader() });
  }

  update(product) {
    return axios.patch(
      API_URL + product._id,
      {
        name: product.name,
        description: product.description,
        img: product.img,
        price: product.price,
        brand: product.brand,
        size: product.size,
      },
      { headers: authHeader() }
    );
  }
  getsingleProduct(product) {
    return axios.get(API_URL + product._id)
  }
}

export default new ProductService();
