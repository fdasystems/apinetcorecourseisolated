import axios from "axios";
import customHeader from './custom-header';

//const API_URL = "https://localhost:44394/api/";
const API_URL = "http://apicourseisolated.azurewebsites.net/api/";



class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "Account/Login", {
        username,
        password
      }, { headers: customHeader() })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data)); //then change for cookie-httpOnly
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  //register(username, email, password) {
    register(email, password) {
    let username = email;
    return axios.post(API_URL + "Account/Create", {
      username,
      //email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
