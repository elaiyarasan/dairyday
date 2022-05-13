import axios from "axios";
const API_URL = "http://localhost:9000/api";

export const getProductList = (data) => {
    return async dispatch => {
        await axios.get(API_URL + "/product/list")
            .then(response => {
                dispatch({
                    type: 'GET_ALL_PRODUCT',
                    data: response.data
                })
            });
    }
}

export const getProductListByCategory = (data) => {
    return async dispatch => {
        await axios.get(API_URL + "/product/listByCategory")
            .then(response => {
                dispatch({
                    type: 'GET_ALL_CATEGORY_BASED_PRODUCT',
                    data: response.data
                })
            });
    }
}


export const getProduct = (data) => {
    return async dispatch => {
        await axios.get(API_URL + "/product/get", data)
            .then(response => {
                dispatch({
                    type: 'GET_PRODUCT',
                    data: response.data
                })
            });
    }
}

export const CreateProductData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/product/creat", data)
            .then(response => {
                dispatch({
                    type: 'SET_PRODUCT',
                    data: response.data
                })
            });
    }
}
export const updateProductData = (data) => {
    return async dispatch => {
        await axios.post(API_URL + "/product/update", data)
            .then(response => {
                dispatch({
                    type: 'SET_PRODUCT',
                    data: response.data
                })
            });
    }
}