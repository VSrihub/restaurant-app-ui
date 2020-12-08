import axios from "axios";

const ORDER_SERVICE_BASE_URL = "http://localhost:6055/api/order";

class OrderService {
  placeOrder(orderComamnd) {
    /**
     * the way of sending the headers and token to the backend api
     */
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.post(ORDER_SERVICE_BASE_URL, orderComamnd, options);
  }
}
export default new OrderService();
