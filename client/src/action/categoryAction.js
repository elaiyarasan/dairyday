import axios from "axios";
const API_URL = "http://localhost:9000/api";

export const getCategoryList = (data) => {
    return async dispatch => {
        await axios.get(API_URL + "/category/list")
            .then(response => {
                dispatch({
                    type: 'GET_ALL_CATEGORY',
                    data: response.data
                })
            });
    }
}

export const getCategory = (data) => {
    return async dispatch => {
        await axios.get(API_URL + "/category/get", data)
            .then(response => {
                dispatch({
                    type: 'GET_CATEGORY',
                    data: response.data
                })
            });
    }
}

export const CreateCategoryData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/category/creat", data)
            .then(response => {
                dispatch({
                    type: 'SET_CATEGORY',
                    data: response.data
                })
            });
    }
}
export const updateCategoryData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/category/update", data)
            .then(response => {
                dispatch({
                    type: 'SET_CATEGORY',
                    data: response.data
                })
            });
    }
}