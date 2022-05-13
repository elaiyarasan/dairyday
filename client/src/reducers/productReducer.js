// ** Initial State
const initialState = {
    data: null,
    allData:[],
    categoryBasedProduct:[]
  }
  
  const product = (state = initialState, action) => {
    switch (action.type) {   
      case 'GET_ALL_PRODUCT':
        return { ...state, allData: action.data } 
      case 'GET_PRODUCT':
        return { ...state, data: action.data } 
      case 'GET_ALL_CATEGORY_BASED_PRODUCT':
          return { ...state, categoryBasedProduct: action.data } 
      default:
        return { ...state }
    }
  }
  export default product
  