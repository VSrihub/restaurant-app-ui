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

  fetchAllCategories() {
    return axios.get(CATEGORY_BASE_URL);
  }
}
export default new CategoryService();
