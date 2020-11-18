import react from "react";
import axios from "axios";

const CATEGORY_BASE_URL = "http://localhost:6053/api/category";

class CategoryService {
  addCategory(categoryObj) {
    /**
     * the way of sending the headers and token to the backend api
     */
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.post(CATEGORY_BASE_URL, categoryObj, options);
  }

  updateCategory(categoryObj) {
    /**
     * the way of sending the headers and token to the backend api
     */
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.put(CATEGORY_BASE_URL, categoryObj, options);
  }

  fetchAllCategories() {
    return axios.get(CATEGORY_BASE_URL);
  }

  deleteCategory(id) {
    return axios.delete(CATEGORY_BASE_URL + "/" + id);
  }

  getCategory(id) {
    return axios.get(CATEGORY_BASE_URL + "/" + id);
  }
}
export default new CategoryService();
