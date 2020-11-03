import axios from "axios";

const USER_REG_BASE_URL = "http://localhost:8080/user-authn/api/authenticate";

class AuthnService {
  doLogin(loginData) {
    console.log("i am in Loginn service abd the data is " + loginData);
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.post(USER_REG_BASE_URL, loginData, options);
  }
}
export default new AuthnService();
