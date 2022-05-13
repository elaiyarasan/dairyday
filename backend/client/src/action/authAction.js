import axios from "axios";
const API_URL = "http://localhost:9000/";

export const login = (data) => {
    return async dispatch => { 
      await axios
      .post(API_URL + "login/login",data)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        dispatch({
          type: 'SET_USER',
          data: response.data
         })
      });
    }
  }

  export const logout = () => {
            localStorage.removeItem("user")
            return async dispatch => { 
            dispatch({
              type: 'SET_USER',
              data: []
            })
          }
  }

  export const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  export const getCurrentUser = (data) => {
    return async dispatch => { 
        dispatch({
                type: 'SET_USER',
                data: data
              })
            }
  }