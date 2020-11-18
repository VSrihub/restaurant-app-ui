import react from "react";
import axios from "axios";

const FOOD_SERVICE_BASE_URL = "http://localhost:6054/api/food";

class FoodService {
  addFood(foodObj) {
    /**
     * the way of sending the headers and token to the backend api
     */
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.post(FOOD_SERVICE_BASE_URL, foodObj, options);
  }

  updateFood(foodObj) {
    /**
     * the way of sending the headers and token to the backend api
     */
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.put(FOOD_SERVICE_BASE_URL, foodObj, options);
  }

  fetchAllFoods() {
    return axios.get(FOOD_SERVICE_BASE_URL);
  }

  deleteFood(id) {
    return axios.delete(FOOD_SERVICE_BASE_URL + "/" + id);
  }

  getFood(id) {
    return axios.get(FOOD_SERVICE_BASE_URL + "/" + id);
  }
}
export default new FoodService();
