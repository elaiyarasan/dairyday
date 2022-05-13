import axios from "axios";
const API_URL = "http://localhost:9000/api";

export const getOrderList = (data) => {
    return async dispatch => {
        await axios.get(API_URL+'/order/list/'+data)
            .then(response => {
                dispatch({
                    type: 'GET_ALL_ORDER',
                    data: response.data
                })
            });
    }
}

export const getOrderData = (id) => {
    return async dispatch => {
        await axios.get(API_URL + '/order/get/'+id)
            .then(response => {
                dispatch({
                    type: 'GET_ORDER',
                    data: response.data
                })
            });
    }
}

export const CreateOrederData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/order/create", data)
            .then(response => {
                dispatch({
                    type: 'GET_ORDER',
                    data: response.data
                })
            });
    }
}
export const updateOrderData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/category/update", data)
            .then(response => {
                dispatch({
                    type: 'GET_ORDER',
                    data: response.data
                })
            });
    }
}