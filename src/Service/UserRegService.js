import react from "react";
import axios from "axios";

const USER_REG_BASE_URL = "http://localhost:6050/user-reg-service/api/";

class UserRegService {
  // this is used to regiter user in AUTH0 IDP
  createUser(regData) {
    console.log("i am in service abd the data is " + regData);
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios.post(USER_REG_BASE_URL + "/user-reg", regData, options);
  }

  fetchUserByEmail(email) {
    console.log("email is " + email);
    return axios.get(USER_REG_BASE_URL + "/user-reg/verifyAccount/" + email);
  }

  changePassword(userData) {
    console.log(
      "i am in service and  the  change password data is " + userData
    );
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(
      USER_REG_BASE_URL + "/user-reg/changePwd",
      userData,
      options
    );
  }
}
export default new UserRegService();
