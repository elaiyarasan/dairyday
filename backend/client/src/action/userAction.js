import axios from "axios";
const API_URL = "http://localhost:9000/api";

export const getUserList = (data) => {
    return async dispatch => {
        await axios.get(API_URL + "/user/list")
            .then(response => {
                dispatch({
                    type: 'GET_ALL_USERS',
                    data: response.data
                })
            });
    }
}

// export const getOrder = (data) => {
//     return async dispatch => {
//         await axios.get(API_URL + "/category/get", data)
//             .then(response => {
//                 dispatch({
//                     type: 'GET_ORDER',
//                     data: response.data
//                 })
//             });
//     }
// }

export const CreateUserData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/user/create", data)
            .then(response => {
                dispatch({
                    type: 'GET_REG_USER',
                    data: response.data
                })
            });
    }
}